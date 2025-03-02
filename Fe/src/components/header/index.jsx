//library
import { React, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
// store
import { Store } from "../../Store";
// imgs
import LogoWhite from "/public/imgs/logoWhite.png";
import LogoBlack from "/public/imgs/logoBlack.png";
// svgs
import ProfileIcon from "../../icons/header/ProfileIcon";
import LogoutIcon from "../../icons/header/LogoutIcon";
import WishIcon from '../../icons/header/WishListIcon';
//
import "./style.css";

import axios from 'axios';


const Header = () => {
  const navigate = useNavigate();
  const store = useContext(Store);
  const handleClick = () => {
    store.setCurrentUser(null);
    navigate("/");
  };

  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/api/v1/users/${store.currentUser._id}`
        );
        // console.log(userResponse);
        setUserData(userResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [userId]);


  return (
    <div className="header">
      {store.currentUser && store.currentUser.role === "ADMIN" ? (
        <div className="grRedirect">
          <div
            className="redirect redirectToAdminPage"
            onClick={() => navigate("/admin")}
          >
            <p className="logoutIcon">
              <LogoutIcon />
            </p>
            <h5>Đi đến trang quản trị</h5>
          </div>
          <div
            className="redirect redirectToTheWebsite"
            onClick={() => navigate("/")}
          >
            <p className="logoutIcon">
              <LogoutIcon />
            </p>
            <h5>Trở lại trang WEB</h5>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="gr">
        <div className="gr1">
          <img
            src={LogoWhite}
            alt=""
            onClick={() => navigate("/")}
            className="logoWhite"
          />
          <img
            src={LogoBlack}
            alt=""
            onClick={() => navigate("/")}
            className="logoBlack"
          />
        </div>
        <div className="gr2">
          <h5 onClick={() => navigate("/allCars")}>Sản phẩm</h5>
          <h5 onClick={() => navigate("/news")}>Tin tức</h5>
          <h5 onClick={() => navigate("/contact")}>Liên hệ</h5>
          <h5 onClick={() => navigate("/introduce")}>Giới thiệu</h5>
        </div>
        {!store.currentUser ? (
          <div className="gr3_1">
            <h5 onClick={() => navigate("/login")}>Login</h5>
            <div
              style={{ width: "1px", height: "15px", margin: "0 10px" }}
              className="partition"
            ></div>
            <h5 onClick={() => navigate("/register")}>Register</h5>
          </div>
        ) : (
          <div className="gr3_2">
            <div className="grDropdown">
              <div className="info">
                <div className="other">
                  <h5>{store.currentUser.username}</h5>
                  <i>{store.currentUser.role}</i>
                </div>
                <img src={userData?.avatar ? userData?.avatar : store.currentUser.avatar} class="avatar-img" alt="" />
              </div>
              <div className="dropdown">
                <div
                  className="grProfile"
                  onClick={() =>
                    navigate("/profile/account/" + store.currentUser._id)
                  }
                >
                  <p className="profileIcon">
                    <ProfileIcon />
                  </p>
                    <p className="profile">Profile</p>
                </div>



                  <div
                    className="grWishList"
                    onClick={() =>
                      navigate("/wishList/" + store.currentUser._id)
                    }
                  >
                    <p className="wishIcon">
                      <WishIcon />
                    </p>
                    <p className="wishList">Favorites</p>
                  </div>



                <div className="grLogout" onClick={handleClick}>
                  <p className="logoutIcon">
                    <LogoutIcon />
                  </p>
                  <p className="logout">Logout</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;