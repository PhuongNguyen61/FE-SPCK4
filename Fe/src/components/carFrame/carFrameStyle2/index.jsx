//Frame xe dạng nằm dọc
//library
import { useNavigate } from "react-router-dom";
//icons
import CalendarIcon from "../../../icons/CarFrame/CarlendarIcon";
import EnergyIcon from "../../../icons/CarFrame/EnergyIcon";
import SittingChairIcon from "../../../icons/CarFrame/SittingChair";
import WheelIcon from "../../../icons/CarFrame/Wheelcon";
import IconRight from "../../../icons/categoryPage/IconRight";
//css
import "./style.css";
const CarFrame2 = ({ car }) => {
  const nav = useNavigate();
  return (
    //viết tên loằng ngoằng để không trùng cái đã có
    <div className="CarFrameComponent2">
      <div className="carImg">
        <img src={car.carImg[0]} alt={car.carName} />
      </div>
      <div className="carInfo">
        <div className="state">{car.state}</div>
        <div className="nameCar" onClick={() => nav(`/car/${car._id}`)}>
          {car.carName}
        </div>
        <div className="Price">
          VNĐ: <span>{car.carPrice ? car.carPrice.toLocaleString() : 0}</span>
        </div>
        <div className="BrandAndCountry">
          {car.brand}, <span>{car.origin}</span>
        </div>
        <div className="parameter">
          <div className="parameterFrame">
            <CalendarIcon></CalendarIcon>
            <div className="title">{car.year}</div>
          </div>
          <div className="parameterFrame">
            <WheelIcon></WheelIcon>
            <div className="title">{car.gearBox}</div>
          </div>
          <div className="parameterFrame">
            <EnergyIcon></EnergyIcon>
            <div className="title">{car.power}</div>
          </div>
          <div className="parameterFrame">
            <SittingChairIcon></SittingChairIcon>
            <div className="title">{car.sitChairs}</div>
          </div>
        </div>
        <div className="line"></div>
        <div className="toDetailPage" onClick={() => nav(`/car/${car._id}`)}>
          Chi tiết xe{" "}
          <IconRight style={{ width: "15", height: "15" }}></IconRight>{" "}
        </div>
      </div>
    </div>
  );
};

export default CarFrame2;
