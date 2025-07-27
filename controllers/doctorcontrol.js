
const doctorModel= require('../models/doctorModels')

const getDoctorInfoController=async(req,res)=>{
    try{
        const doctor= await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success:true,
            message:"doctor data fetch success",
            data: doctor

        })

    }catch(error){
        console.log(error)
        res.status(500).send ({
            success:false,
            error,
            message:'error in fetching Doctor Details'
        })
    }
}
const updateprofilecontroller = async(req,res)=>{
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId},req.body)
        res.status(200).send({
            success:true,
            message:"Doctor profile update",
            data:doctor,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            error,
            message:"Doctor Profile update issue",
            success:false
        })

    }
}
const getDoctoryidController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    console.log(req.body, "hii");
    res.status(200).send({
      success: true,
      data: doctor,
      message: 'Single doctor info fetched',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error doctor info not found",
    });
  }
};



module.exports={getDoctorInfoController,updateprofilecontroller,getDoctoryidController}