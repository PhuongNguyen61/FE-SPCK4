import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
//icons
import MailAcceptedIcon from "../../../icons/usermail/mailAccepted";
import MailSeenIconUser from "../../../icons/usermail/mailSeen";
import MailReJectedIcon from "../../../icons/usermail/mailRejected";
import MailSend from "../../../icons/usermail/mailSend";
//loading
import Loading from "../../Loading";
//css
import "./UserMail.css";

const MailPage = () => {
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    const fetchUserMailData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/mail/SenderMail?userId=${userId}`
        );
        setMails(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchUserMailData();
  }, [userId]);

  const checkReason = (mail) => {
    setSelectedMail(mail);
  };

  const closeModal = () => {
    setSelectedMail(null);
  };

  return (
    <div className="MailPage">
      <h3>Đơn đã gửi</h3>
      <div className="listMail">
        {mails && mails.length > 0 ? (
          mails.map((mail, index) => (
            <div className="mailFrame" key={mail._id}>
              <div className="section1">
                <gr>
                  <label htmlFor="">Tên xe</label>
                  {mail.carId.carName ? (
                    <div className="nameCar">{mail.carId.carName}</div>
                  ) : (
                    <>Hello</>
                  )}
                  {/* <div className="nameCar">{mail.carId.carName}</div> */}
                </gr>
                <gr>
                  <label htmlFor="">Hết hạn vào</label>
                  <div className="expiredAd">
                    {" "}
                    {moment(mail.expiresAt).format("DD/MM/YYYY")}
                  </div>
                </gr>
              </div>
              {mail.status.trim() === "chấp thuận" && (
                <div className="section2">
                  <div className="statusIcon">
                    <MailAcceptedIcon></MailAcceptedIcon>
                  </div>
                  <div className="status">Người bán sẽ sớm liên hệ</div>
                </div>
              )}
              {/* Nếu từ chối */}
              {mail.status.trim() === "từ chối" && (
                <div className="section2">
                  <div className="statusIcon">
                    <MailReJectedIcon></MailReJectedIcon>
                  </div>
                  <div className="status">Người bán đã từ chối</div>
                  <div className="toReason" onClick={() => checkReason(mail)}>
                    Xem lí do{" "}
                  </div>
                </div>
              )}
              {mail.status.trim() === "đang xử lý" && mail.isRead === false && (
                <div className="section2">
                  <div className="statusIcon">
                    <MailSend></MailSend>
                  </div>
                  <div className="status">Người bán chưa xem...</div>
                </div>
              )}
              {mail.status.trim() === "đã xem" && mail.isRead === true && (
                <div className="section2">
                  <div className="statusIcon">
                    <MailSeenIconUser></MailSeenIconUser>
                  </div>
                  <div className="status">Người bán đã xem</div>
                </div>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      {selectedMail ? (
        <div className="reasonFrame">
          <div className="modal">
            <div className="ReasonModalheader">
              <h3 className="title">Thư bị từ chối</h3>

              <div className="closeModal" onClick={closeModal}>
                X
              </div>
            </div>
            <div className="ReasonModalcontent">
              <div className="title">Lí do</div>
              <textarea name="" id="" value={selectedMail.reason}></textarea>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* <div className="notifications">
        {notifications.map((n) => (
          <div key={n.mailId} className="notification">
            {n.message}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MailPage;
