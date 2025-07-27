import React from 'react'
import '../styles/RegisterStyle.css'
import { Form, Input ,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {showLoading,HideLoading}from '../redux/features/alertSlice'
import axios from'axios'


function Register() {
  const navigate =useNavigate()
    const dispatch =useDispatch()


  const onFinishHandler=async(values)=>{
    console.log(values)
    try{
       dispatch(showLoading())
      const res = await axios.post('/api/v1/user/register',values)
        dispatch(HideLoading())
      if(res.data.success){
        // localStorage.setItem("token",res.data.token)
        message.success('Register successfully')
        navigate('/login')
      }else{
        message.error("something wents wrong")
        console.log("something wents wrong")
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
        <h1>Register From</h1>
        <Form.Item label='Name' name='name'>
          <Input type='text' required/>
        </Form.Item>
        <Form.Item label='Email' name='email'>
          <Input type='email' required/>
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input type='password' required/>
        </Form.Item>
        <Link to='/login'>already user login here</Link>
        <button className='btn btn-primary' type='submit'>
          Register
        </button>

      </Form>
      
     
    </div>
  )
}

export default Register
