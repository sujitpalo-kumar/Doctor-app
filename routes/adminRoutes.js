const express = require('express')
const router=express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController, getAllDoctorsController, changeAccountstatuscontroller } = require('../controllers/adminCtrl')

router.get('/getAllUsers',authMiddleware,getAllUsersController)
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
router.post('/changeAccountStatus',authMiddleware,changeAccountstatuscontroller)










module.exports=router