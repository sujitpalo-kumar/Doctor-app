const express =require('express')
const colors = require('colors')
const moragan = require('morgan')
const dotenv =require('dotenv').config();
const app=express()
const connectDB = require("./config/db")
const loginroute=require('./routes/userRoutes')
const adminuser=require('./routes/adminRoutes')
const doctorroutes=require('./routes/doctorRoutes')
const path= require('path')


//middleware
app.use(express.json())
app.use(moragan('dev'))
connectDB()

///routes

// app.get('/',(req,res)=>{
//     res.status(200).send({
//         message:"server runing"
//     })

// })

app.use("/api/v1/user",loginroute)
app.use("/api/v1/admin",adminuser)
app.use("/api/v1/doctor",doctorroutes)


app.use(express.static(path.join(__dirname, './client/dist')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/dist/index.html'))

})

//  port

const port =process.env.PORT || 8080


// listen port
app.listen(port,()=>{
    console.log(`Server runing in ${process.env.DEV_MODE}`.bgCyan.white)
})
