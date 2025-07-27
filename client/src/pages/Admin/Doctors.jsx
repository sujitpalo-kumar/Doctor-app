import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

function Doctors() {
  const [doctor, setDoctor] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        alert(res.data.message || "Failed to fetch users");
        setDoctor([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Something went wrong while fetching users");
    }
  };
const handeleAccountStatus = async (record, status) => {
  try {
    const res = await axios.post(
      "/api/v1/admin/changeAccountStatus",
      {
        doctorId: record._id,
        userId: record.userId,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      message.success(res.data.message);
      getUsers()
    }
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
  }
};


  useEffect(() => {
    getUsers();
  }, []);
  console.log(doctor, "cc");

  const colums = [
{
  title: "Name",
  dataIndex: "name",
  render: (text, record) => {
    return (
      <span>
        {record.firstname} {record.lastname}
      </span>
    );
  },
},

    //    {
    //   title: "Last name",
    //   dataIndex: "lastname",
    // },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={()=>handeleAccountStatus(record,'approved')}>Approve</button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    }
  ];

  return (
    <Layout>
      <h1 className="text-center">All Doctor</h1>
      <Table columns={colums} dataSource={doctor}></Table>
    </Layout>
  );
}

export default Doctors;
