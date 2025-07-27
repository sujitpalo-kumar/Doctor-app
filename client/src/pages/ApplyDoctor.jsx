import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, showLoading } from "../redux/features/alertSlice";
// import { setUser } from "../redux/features/userSlice";
import  moment from 'moment';
import axios from "axios";

function ApplyDoctor() {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelfinish = async (value) => {
    try {
      dispatch(showLoading());

      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        { ...value, userId: user._id,     
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
  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form
        layout="vertical"
        onFinish={handelfinish}
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
          <button className="btn btn-primary">Submit</button>
        </div>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
