import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import {useDispatch} from'react-redux'
import {showLoading,HideLoading} from '../redux/features/alertSlice'

function Bookingpage() {
  const params = useParams();
  const [doctor, setDoctor] = useState([]);
  const[date,setDate]=useState()
  const [time,setTime]=useState()
  const [isAvailable,setAvailble]=useState()

  const dispatch =useDispatch()

  const getUserDate = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getdoctorbyid",
        { doctorId: params.doctorid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        console.log("error");
      }
      console.log(doctor, "aaa");
    } catch (error) {
      console.log(error);
    }
  };
  // ----------Booking Function--------
const handelBooking = async () => {
  try {
    dispatch(showLoading());

    const res = await axios.post(
      "/api/v1/user/book-appointment",
      {
        doctorId: params.doctorId,
        doctorInfo: doctor,
        date: date,
        time: time,
        
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Optionally check for success
    if (res.data.success) {
      setAvailble(true)
      console.log(res.data.message)
      // maybe show a success toast?
    } else {
        setAvailble(false)
      console.log(res.data.message)
    }
  } catch (error) {
    console.error("Booking failed:", error);
  } finally {
    dispatch(HideLoading()); // ✅ always hides loader, success or fail
  }
};
const HandelAvailibility= async ()=>{
  try{
    setAvailble
    if(! date && !time){
      return alert("date time required")
    }
       dispatch(showLoading());
           const res = await axios.post(
      "/api/v1/user/booking-availbility",
      {
        doctorId: params.doctorId,
        doctorInfo: doctor,
        date: date,
        time: time,
        
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Optionally check for success
    if (res.data.success) {
      // setAvailble(true)
       console.log(res.data.message)
    } else {
      // maybe show an error toast?
    }


  }catch(error){
    console.log(error)
  }finally {
    dispatch(HideLoading()); // ✅ always hides loader, success or fail
  }
}




  useEffect(() => {
    getUserDate();
  }, []);

  return (
    <Layout>
      <div className="container">
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstname} {doctor.lastname}
            </h4>
            <h4>Fee. {doctor.feesperconsultation} </h4>
             {/* <h4>Timings. {doctor.timings[0]} -  {doctor.timings[1]}</h4> */}
             <div className="d-flex flex-column w-50">
                <DatePicker className="m-2" format='DD-MM-YYYY'
                 onChange={(value)=>{
                  // setAvailble(false)
                 setDate(moment(value).format('DD-MM-YYYY'))}}/>
                <TimePicker className="m-2" format="HH:mm"onChange={(value)=>{
                    // setAvailble(false)
                  setTime(
                    moment(value).format('HH:mm')
                )}}/>
                <button className="btn btn-primary mt-1" onClick={HandelAvailibility}>Check Availibility</button>
{/* {!isAvailable && ( */}
                   <button className="btn btn-dark mt-1" onClick={handelBooking}>Book Now</button>
{/* )} */}
             </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Bookingpage;
