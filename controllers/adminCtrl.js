const doctorModel =require('../models/doctorModels')
const userModel =require('../models/userModel')


const getAllUsersController =async(req,res)=>{

    try{
        const users =await userModel.find()
        res.status(200).send({
            users,
            success:true,
            message:"users fetched successfully"
        })

    }catch(error){
        res.status(500).send({
            message:"error while fetching users",
            success:false,
            error

        })
    }
}
const getAllDoctorsController =async(req,res)=>{

        try{
        const doctor =await doctorModel.find()
        res.status(200).send({
            data:doctor,
            success: true,
            message:"doctor fetched successfully"
        })

    }catch(error){
        res.status(500).send({
            message:"wrror while fetching doctor",
            success:false,
            error

        })
    }
}
const changeAccountstatuscontroller = async (req, res) => {
  try {
    console.log(req.body, "aaa");
    const { doctorId, status } = req.body;

    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });

    const user = await userModel.findOne({ _id: doctor.userId });

    user.notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account request has been ${status}`,
      onClickPath: "/notification",
    });

    user.isDoctor = status === 'approved'?true:false;

    await user.save();

    res.status(201).send({
      success: true,
      message: 'Account status updated',
      data: doctor,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in account status",
    });
  }
};



module.exports={getAllUsersController,getAllDoctorsController,changeAccountstatuscontroller}