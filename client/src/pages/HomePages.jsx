import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import Doctorlist from '../components/Doctorlist';


function HomePages() {
  const [doctor,setDoctor]=useState([])


  const getUserDate = async()=>{
    try{
      const res= await axios.get('/api/v1/user/getAlldoctor',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
   
      if(res.data.success){
        setDoctor(res.data.data)
      }else{
        console.log("error")
      }
         console.log(doctor,"aaa")

    }catch(error){
      console.log(error)

    }

  }
  useEffect(()=>{
    getUserDate()
  },[])
  return (
    <Layout>
      <h1 className='text-center'>Home page</h1>
      <Row>
    {doctor && doctor.map(doc => {
  return <Doctorlist doctor={doc} />;
})}
     

      </Row>
    </Layout>
  )
}

export default HomePages
