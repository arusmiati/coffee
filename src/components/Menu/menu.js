import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './menu.css';
import { AuthContext } from '../../context/authContext';

const Menu = () => {
  const { authData } = useContext(AuthContext);
  const [menu, setMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Seasonal Product');

  useEffect(() => {
    const getMenu = async () => {
      if (!authData || !authData.access_token) {
        console.error('Auth data is not available');
        return;
      }

      try {
        const response = await axios.get('https://soal.staging.id/api/menu', {
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

  console.log('authData:', authData);

  if (!authData) {
    return <div>Loading authentication data...</div>;
  }

  if (!menu) {
    return <div>Loading menu...</div>;
  }

  const filteredItems = menu.items.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div className="menu-container">
      <div className="categories">
        {menu.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={selectedCategory === category.name ? 'active' : ''}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="menu-items">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
