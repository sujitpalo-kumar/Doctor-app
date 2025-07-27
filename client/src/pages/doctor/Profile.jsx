import React, { useEffect ,useState} from 'react'
import Layout from '../../components/Layout'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { Col, Form, Input, Row, TimePicker,message } from "antd";
import { HideLoading, showLoading } from "../../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import  moment from 'moment';

function Profile() {
    const {user}= useSelector(state=>state.user)
    const [doctor,setDoctor]=useState(null)
    const params=useParams()
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handelfinish = async (value) => {
    try {
      dispatch(showLoading());

      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        { ...value, userId: user._id ,
             timings:[
                moment(value.timings[0]).format('HH:mm'),
                 moment(value.timings[1]).format('HH:mm'),
             ]},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (res.data.success) {
        message.success("Doctor account applied successfully");
        navigate("/");
      } else {
        message.error("Failed to apply doctor account");
      }
      //   dispatch(setUser(res.data.data));
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
      console.log(error);
    }
  };

    const getDoctorinfo=async ()=>{
        try{
            const res= await axios.post('/api/v1/doctor/getDoctorInfo',
                {userId:params.id},
                {
                    headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

                }
           
            )
            if(res.data.success){
                setDoctor(res.data.data)
            }else{
                console.log("error in get doctor info")
            }

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getDoctorinfo()
    },[])
  return (
    <Layout>
        <h1>manage profile</h1>
        {doctor && (
                  <Form
                    layout="vertical"
                    onFinish={handelfinish}
                    initialValues={{
                        ...doctor,
                        timings:[
                            moment(doctor.timings[0],'HH:mm'),
                             moment(doctor.timings[1],'HH:mm'),
                        ]
                    }}
                    className="alig-item-center content-align-center">
                    <h4>Personal Details</h4>
                    <Row>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="First Name"
                          name="firstname"
                          required
                          rules={[{ required: true }]}>
                          <Input type="text" placeholder="Your First Name " />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Last Name"
                          name="lastname"
                          required
                          rules={[{ required: true }]}>
                          <Input type="text" placeholder="Your Last Name " />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Phone Number"
                          name="phone"
                          required
                          rules={[{ required: true }]}>
                          <Input type="number" placeholder="Phone Number " />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Email"
                          name="email"
                          required
                          rules={[{ required: true }]}>
                          <Input type="email" placeholder="Email " />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Website"
                          name="website"
                          required
                          rules={[{ required: true }]}>
                          <Input type="text" placeholder="website " />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Adress"
                          name="adress"
                          required
                          rules={[{ required: true }]}>
                          <Input type="text" placeholder="adress " />
                        </Form.Item>
                      </Col>
                    </Row>
                    <h4>Personal Details</h4>
                    <Row>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Specialization"
                          name="specialization"
                          required
                          rules={[{ required: true }]}>
                          <Input type="text" placeholder="specialization " />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Experiance"
                          name="experiance"
                          required
                          rules={[{ required: true }]}>
                          <Input type="text" placeholder="experiance " />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Consulation Fees"
                          name="feesperconsultation"
                          required
                          rules={[{ required: true }]}>
                          <Input type="number" placeholder="Consulation Fees " />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Timings"
                          name="timings"
                          required
                          rules={[{ required: true }]}>
                          <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="d-flex jsutify-content-center">
                      <button className="btn btn-primary">update</button>
                    </div>
                  </Form>

        )}
      
    </Layout>
  )
}

export default Profile
