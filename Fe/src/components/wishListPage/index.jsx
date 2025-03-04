import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import slider from "../../../public/imgs/background.png"
import CarFrame2 from '../carFrame/carFrameStyle2';

import IconLeft from '../../icons/categoryPage/IconLeft';
import IconRight from '../../icons/categoryPage/IconRight';
import Loading from "../Loading"
import like from "../../../public/imgs/like.png"

const WishListPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const carsPerPage = 9;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) return;

        const accessToken = user.accessToken;
        const response = await axios.get(`http://localhost:8080/api/v1/cars/wishlist/${user._id}?limit=${carsPerPage}&page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setWishlist(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [currentPage]);
  if (!wishlist) {
    return <Loading></Loading>;
  }


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);

    }
  };

  if (!wishlist) {
    return <div>Loading</div>;
  }
  return (
    <div className='wishlist'>
      <div className='heading'>
        <img className='bannerimg' src={slider} alt="" />
        <div className='bannerheading'>
          <h1>My Wish List</h1>
        </div>
      </div>
      {wishlist.length > 0 ? (
        <div className='wishlistIn'>
          <h3 className="title">
            Bạn có <span>{wishlist.length}</span> xe yêu thích
          </h3>
          <div className="listCar">
            {wishlist && wishlist.length > 0 ? (
              wishlist.map((car, index) => <CarFrame2 key={index} car={car} />)
            ) : (
              <>Không có xe nào</>
            )}
          </div>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <IconLeft></IconLeft>
            </button>
            <span>
              Trang {currentPage}/{totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <IconRight></IconRight>
            </button>
          </div>
        </div>
      ):(
        <div className='noneWishlist'>
          <p>Hiện tại bạn chưa có chiếc xe yêu thích nào.</p>
          <img src={like} alt="" />
          <p>Hãy thêm những chiếc yêu thích của bạn vào đây nào!</p>
        </div>
      )}
      
      {loading && <Loading></Loading>}
    </div>
  )
}

export default WishListPage