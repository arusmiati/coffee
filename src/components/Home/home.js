import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import './home.css';
import { AuthContext } from '../../context/authContext';

const Home = () => {
  const { authData } = useContext(AuthContext);
  const [homeData, setHomeData] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(0);
  const history = useHistory(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://soal.staging.id/api/home', {
          headers: {
            Authorization: `${authData.token_type} ${authData.access_token}`,
          },
        });
        setHomeData(response.data.result);
      } catch (error) {
        console.error('Error fetching home data', error);
      }
    };
    fetchData();
  }, [authData]);

  useEffect(() => {
    if (homeData?.banner.length > 0) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % homeData.banner.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [homeData]);

  if (!homeData) {
    return <div>Loading...</div>;
  }

  const handleDotClick = (index) => {
    setCurrentBanner(index);
  };

  const handleMenuClick = () => {
    history.push('/menu'); 
  };

  return (
    <div className="home-container">
      <div className="home-background">
        <div className="home-details">
          <h1>Good Afternoon,<br />{homeData.name}</h1>
          <div className="home-item">
            <div className="qr-item"><img src="./assets/qrCode.png" alt="QR Code" /></div>
            <div className="balance">
              <table>
                <tbody>
                  <tr>
                    <td>Saldo</td>
                    <td className='table-item'>Rp {homeData.saldo}</td>
                  </tr>
                  <tr>
                    <td>Points</td>
                    <td className='table-item item1'>{homeData.point}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-container">
        <img src={homeData.banner[currentBanner]} alt={`Banner ${currentBanner + 1}`} />
        <div className="banner-nav">
          <div className="banner-dots">
            {homeData.banner.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentBanner ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
          <div className="view-all">View all</div>
        </div>
      </div>
      <div className="footer">
        <img src="./assets/home1.png" alt="Home Icon" />
        <img 
          src="./assets/menu1.png" 
          alt="Menu Icon" 
          onClick={handleMenuClick} 
        />
      </div>
    </div>
  );
};

export default Home;
