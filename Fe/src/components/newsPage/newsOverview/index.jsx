import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
//
import './style.css';

const NewsOverview = () => {
    const [listCarNews, setListCarNews] = useState([]);
    const [listMarketNews, setListMarketNews] = useState([]);
    const [listExplore, setListExplore] = useState([]);
    const queryAllNews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/news/the3LatestNewsPerCategory');
            setListCarNews(response.data.dataListCarNews);
            setListMarketNews(response.data.dataListMarketNews);
            setListExplore(response.data.dataListExplore);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryAllNews();
    }, []);
    const navigate = useNavigate();
    return (
        <div className='newsOverview'>
            <div className='grListNews'>
                <h2>Tin xe</h2>
                <div className='listByCategory'>
                    {listCarNews.map((news, index) => {
                        return <div key={index + 1} className={`news news${index + 1}`} onClick={() => navigate(`/news/details/${news._id}`)}>
                            <img src={news.img} alt="" />
                            <div className='content'>
                                <h4>{news.title}</h4>
                                <div className='row'>
                                    <h5>Tin xe</h5>
                                    <p>• {moment(news.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className='grListNews'>
                <h2>Tin thị trường</h2>
                <div className='listByCategory'>
                    {listMarketNews.map((news, index) => {
                        return <div key={index + 1} className={`news news${index + 1}`} onClick={() => navigate(`/news/details/${news._id}`)}>
                            <img src={news.img} alt="" />
                            <div className='content'>
                                <h4>{news.title}</h4>
                                <div className='row'>
                                    <h5>Tin thị trường</h5>
                                    <p>• {moment(news.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className='grListNews'>
                <h2>Khám phá</h2>
                <div className='listByCategory'>
                    {listExplore.map((news, index) => {
                        return <div key={index + 1} className={`news news${index + 1}`} onClick={() => navigate(`/news/details/${news._id}`)}>
                            <img src={news.img} alt="" />
                            <div className='content'>
                                <h4>{news.title}</h4>
                                <div className='row'>
                                    <h5>Khám phá</h5>
                                    <p>• {moment(news.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewsOverview