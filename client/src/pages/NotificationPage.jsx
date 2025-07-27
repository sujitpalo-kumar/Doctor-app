import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, HideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NotificationPage() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          usersId: user._id,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (res.data.success) {
        message.success("All notifications marked as read");
        // Update the notification state in Redux
      } else {
        message.error("Failed to mark all read");

        // Update the notification state in Redux
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to mark all read", error);
    }
  };
  const handleDeleteAllRead = async() => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        {
          usersId: user._id,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (res.data.success) {
        message.success("All read notifications deleted");
        // Update the notification state in Redux
      } else {
        message.error("Failed to delete all read notifications");

        // Update the notification state in Redux
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to delete all read notifications", error);
    }
  };
  console.log(user?.notification);
  return (
    <Layout>
      <h1 className="mt-2 text-center p-3">Notification Page</h1>
      <Tabs>
        <Tabs.TabPane tab="unread" key={0}>
          <div className="d-flex justify-content-center">
            <h2 className="p-2" onClick={handleMarkAllRead}>
              Mark all Read
            </h2>
          </div>
          {user?.notification.map((notification, index) => {
            return (
              <div key={index} className="card p-3 m-2">
                <div
                  className="card-text"
                  onClick={() => navigate(notification.data.onClickpath)}
                >
                  {notification.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>

        <Tabs.TabPane tab="read" key={1}>
          <div className="d-flex justify-content-center">
            <h2 className="p-2" onClick={handleDeleteAllRead}>
              {" "}
              Delete all read
            </h2>
          </div>
                   {user?.seeninotification.map((notification, index) => {
            return (
              <div key={index} className="card p-3 m-2">
                <div
                  className="card-text"
                  onClick={() => navigate(notification.data.onClickpath)}
                >
                  {notification.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default NotificationPage;
