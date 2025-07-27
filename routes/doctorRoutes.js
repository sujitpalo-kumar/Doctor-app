const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDoctorInfoController ,updateprofilecontroller,getDoctoryidController} = require('../controllers/doctorcontrol')
const router =express.Router()

router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)
router.post('/updateProfile',authMiddleware,updateprofilecontroller)
router.post('/getdoctorbyid',authMiddleware,getDoctoryidController)


module.exports=router