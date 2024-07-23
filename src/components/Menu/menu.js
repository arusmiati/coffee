import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import './menu.css';
import { AuthContext } from '../../context/authContext';

const Menu = () => {
  const { authData } = useContext(AuthContext);
  const [menu, setMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Seasonal Product');
  const menuRefs = useRef([]);
  const history = useHistory(); 

  useEffect(() => {
    const getMenu = async () => {
      if (!authData || !authData.access_token) {
        console.error('Auth data is not available');
        return;
      }

      try {
        const response = await axios.post('https://soal.staging.id/api/menu', 
        { show_all: 1 }, 
        {
          headers: {
            Authorization: `${authData.token_type} ${authData.access_token}`,
          },
        });
        setMenu(response.data.result);
      } catch (error) {
        console.error('Error fetching menu data', error);
      }
    };

    getMenu();
  }, [authData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const activeCategory = menuRefs.current.find((ref) => {
        if (ref && ref.offsetTop) {
          return scrollPosition >= ref.offsetTop && scrollPosition < ref.offsetTop + ref.offsetHeight;
        }
        return false;
      });
      if (activeCategory) {
        setSelectedCategory(activeCategory.dataset.category);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menu]);

  console.log('authData:', authData);

  if (!authData) {
    return <div>Loading authentication data...</div>;
  }

  if (!menu) {
    return <div>Loading menu...</div>;
  }
 
  const categories = menu.categories;

  const handleHomeClick = () => {
    history.push('/home'); 
  };

  const handleCategoryClick = (index) => {
    const categoryElement = menuRefs.current[index];
    if (categoryElement) {
      window.scrollTo({
        top: categoryElement.offsetTop,
        behavior: 'smooth',
      });
      setSelectedCategory(categoryElement.dataset.category);
    }
  };

  return (
    <div className="menu-container">
      <div className="navbar">
        <img src="./assets/logo technopartner.png" alt="Logo" className="logo" />
      </div>
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={category.category_name}
            onClick={() => handleCategoryClick(index)}
            className={selectedCategory === category.category_name ? 'active' : ''}
          >
            {category.category_name}
          </button>
        ))}
      </div>
      <div className="menu-items">
        {categories.map((category, index) => (
          <div key={category.category_name} data-category={category.category_name} ref={(el) => menuRefs.current[index] = el}>
            <h2>{category.category_name}</h2>
            {category.menu.map((item) => (
              <div key={item.name} className="menu-item">
                <img src={item.photo} alt={item.name} />
                <div className="item-details">
                  <div className="item-text">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <p className="item-price">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="dot-indicator">
        {categories.map((category) => (
          <span key={category.category_name} className={`dot ${selectedCategory === category.category_name ? 'active' : ''}`}></span>
        ))}
      </div>
      <div className="footer">
        <img 
          src="/assets/home1.png" 
          onClick={handleHomeClick} 
          alt="Home Icon" />
        <img 
          src="/assets/menu1.png" 
          alt="Menu Icon" 
        />
      </div>
    </div>
  );
};

export default Menu;
