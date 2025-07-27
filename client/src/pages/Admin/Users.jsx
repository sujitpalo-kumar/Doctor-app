import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table } from "antd";

function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        alert(res.data.message || "Failed to fetch users");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Something went wrong while fetching users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log(users, "cc");

  const colums = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
          render: (text, record) => (
        <div className="d-flex">
        <span>{record.isDoctor? "Yes":"No"}</span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">All Users</h1>
<Table columns={colums} dataSource={users}
>

</Table>
    </Layout>
  );
}

export default Users;
