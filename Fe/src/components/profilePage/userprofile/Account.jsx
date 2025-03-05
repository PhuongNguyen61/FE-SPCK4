import { React, useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../userprofile/Account.css";
import axios from "axios";
// import { Button } from "antd";
import { Store } from "../../../Store";
import Loading from "../../Loading";

const Account = () => {
  const navigate = useNavigate();
  const store = useContext(Store);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!store.currentUser) {
      navigate('/');
    };
  }, []);

  //dữ liệu user
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/api/v1/users/${store.currentUser._id}`
        );
        setUserData(userResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <Loading></Loading>;
  }

  const formatDate = (d) => {
    if (d != null) {
      const date = new Date(d);
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    return null
  }

  // if (!carData) {
  //   return <Loading></Loading>;
  // }
  return (
    <div className="account">
      <div className="form">
        <div className="avatar">
          <img src={userData.avatar} alt="" />
        </div>
        <div className="text">
          <p>Username: {userData.username} </p>
          <p>Email: {userData.email} </p>
          <p>Họ tên: {userData.fullname}</p>
          <p>Số điện thoại: {userData.phoneNumber} </p>
          <p>Địa chỉ: {userData.address} </p>
          <p>Ngày sinh: {formatDate(userData.dateOfBirth)} </p>
          {/* <p>Role: {userData.role} </p> */}
        </div>
        {userData.role === 'PROVIDER' ? (
          <div className="provider pro">
            <button className="btn-provider btn" onClick={() => navigate(`/provider/${store.currentUser._id}`)}>
              Quản lý tin đăng bán và đơn hàng
            </button>
          </div>
        ) : (
          <div className="registerProvider pro">
            <button className="btn-registerProvider btn" onClick={() => navigate(`/`)}>
              Đăng ký trở thành nhà cung cấp
            </button>
          </div>
        )}
      </div>
      {loading && <Loading></Loading>}
    </div>
  );
};

export default Account;
