const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const doctormodel = require("../models/doctorModels");
const appointmentModel=require('../models/appointmentModel')
const moment  = require('moment')

const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login sucess", success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: `Login Controller ${error.message}` });
  }
};
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "user already exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    console.table(req.body);

    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
  }
};
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.usersId });
    user.password = undefined;
    console.log(req.body, "userss");
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        sucess: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctormodel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminuser = await userModel.findOne({ isAdmin: true });
    const notification = adminuser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} Has applied for a Doctor Account`,
      data: {
        doctorid: newDoctor._id,
        name: newDoctor.firstname + " " + newDoctor.lastname,
        onClickpath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminuser._id, { notification });

    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for doctor account",
    });
  }
};
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.usersId);
    const seeninotification = user.seeninotification;
    const notification = user.notification;
    seeninotification.push(...notification);
    user.notification = [];
    user.seeninotification = notification;
    const updatedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "All Notifications fetched successfully",

      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all notifications",
    });
  }
};
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.usersId);
    user.notification = [];
    user.seeninotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({

      success: true,
      data: updatedUser,
      message: "All Notifications deleted successfully",
    })

    res.status(200).send({
      success: true,
      message: "All Notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting all notifications",
    });
  }
}
const getAllDoctorController = async(req,res)=>{
  try{
    const doctors= await doctormodel.find({status:'approved'})
    res.status(200).send({
      success:true,
      message:'Doctor List fetch sucessfully',
      data:doctors,
    })

  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while Fetching Doctor'
    })
  }
}


const bookAppointmentController = async (req, res) => {
  try {
    const { doctorInfo, date, time  } = req.body;

    if (!doctorInfo || !date || !time ) {
      return res.status(400).send({
        success: false,
        message: 'Missing required appointment data.',
      });
    }

    const formattedDate = moment(date, 'DD-MM-YYYY').toISOString();
    const formattedTime = moment(time, 'HH:mm').toISOString();

    // Construct the full appointment object manually
    const newAppointment = new appointmentModel({
      userId: doctorInfo._id,
      doctorId: doctorInfo._id,
      doctorinfo: doctorInfo,    // if your schema uses type: Object
      userInfo: doctorInfo.userId ,
      date: formattedDate,
      time: formattedTime,
      status: 'pending',
    });

    await newAppointment.save();

    const user = await userModel.findOne({ _id: doctorInfo.userId });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Doctor's user not found",
      });
    }

    user.notification.push({
      type: 'New-appointment-request',
      message: `A New appointment request from ${doctorInfo.name}`,
      onClickPath: '/user/appointments',
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: 'Appointment booked successfully',
    });

  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).send({
      success: false,
      error,
      message: 'Appointment booking failed',
    });
  }
};
const bookingAvilbilityContoller= async(req,res)=>{
  try{
    const date= moment(req.body.date,'DD-MM-YYYY').toISOString()
  const FromTime = moment(req.body.time, 'HH-mm') // ⬅️ Fix format if it's 'HH:mm' not 'HH-mm'
  .subtract(1, 'hours')
  .toISOString();

const toTime = moment(req.body.time, 'HH-mm')
  .add(1, 'hours')
  .toISOString();




    const doctorId=req.body.doctorInfo._id
    const Appointment= await appointmentModel.find({doctorId,date,
      time:{
        $gte:FromTime,$lte:toTime
      }
    })
    if (Appointment.length>0){
      return res.status(200).send({
        success:true,
        message:'Appointment  Availble'
      })
    }else{
      return res.status(200).send({
        success:true,
        message:'appointment Booked Succesfully'
      })
    }

  }catch(error){
    console.log(error,"error")
    res.status(500).send({
      success:false,
      error,
      message:'error in Booking'
    })

  }
}


module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorController,
  bookAppointmentController,
  bookingAvilbilityContoller,
};
