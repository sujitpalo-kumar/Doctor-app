const express=require('express')
const { loginController, registerController, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController ,getAllDoctorController,bookAppointmentController,bookingAvilbilityContoller} = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router=express.Router()

//routes

//login || POST

router.post('/login',loginController)

//routes

//register || POST

router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController)
router.post('/apply-doctor',authMiddleware,applyDoctorController)
router.post('/get-all-notification',authMiddleware,getAllNotificationController)
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)
router.get('/getAlldoctor',authMiddleware,getAllDoctorController)
router.post('/book-appointment',authMiddleware,bookAppointmentController)
router.post('/booking-availbility',authMiddleware,bookingAvilbilityContoller)

module.exports= router

