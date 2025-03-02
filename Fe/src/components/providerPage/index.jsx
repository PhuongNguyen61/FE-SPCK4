import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//
import "./style.css";

const ProviderPage = () => {
  const nav = useNavigate();
  return (
    <div className="ProviderPageTL">
      <div className="ProviderPageTLHeader">
        <div className="section1">
          <p>Quản lý tin đăng bán và đơn hàng</p>
        </div>
        <div className="section2">
          <div className="sq sq1" onClick={() => nav("postmanage")}>
            Tin đăng bán
          </div>
          <div className="sq sq2" onClick={() => nav("mailContactManage")}>
            Đơn của khách{" "}
          </div>
          <div className="sq sq3" onClick={() => nav("/postingCar")}>
            Đăng bán xe
          </div>
        </div>
      </div>
      <div className="ProviderTLContent">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ProviderPage;
