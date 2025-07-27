import React from 'react'
import '../styles/RegisterStyle.css'
import { Form, Input ,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {showLoading,HideLoading}from '../redux/features/alertSlice'
import axios from'axios'


function Login() {
  const navigate =useNavigate()
  const dispatch =useDispatch()
  console.log("Login page loaded");


  const onFinishHandler=async(values)=>{
    console.log(values)
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login',values)
      dispatch(HideLoading())
      if(res.data.success){
        message.success('Register successfully')
        localStorage.setItem("token", res.data.token); 
        navigate('/')
      }else{
        message.error("something wents wrong")
      }

    }
    catch(error){
      dispatch(HideLoading())
      console.log(error)
      message.error(error)


    }
  }

  return (
    <div className='form-container'>
      <Form layout="vertical" onFinish={onFinishHandler}>
        <h1>Login Fromm</h1>
      <Form.Item label='Email' name='email'>
             <Input type='email' required/>
           </Form.Item>

        <Form.Item label='Password' name='password'>
          <Input type='password' required/>
        </Form.Item>
        <Link to='/register'>Not a user  Register here</Link>
        <button className='btn btn-primary' type='submit'>
         Login
        </button>

      </Form>
      
     
    </div>
  )
}

export default Login
