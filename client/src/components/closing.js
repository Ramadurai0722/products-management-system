import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Navbar = styled.nav`
  width: 100%;
  background-color: #333;
  color: white;
  border-bottom: 2px solid #ccc;
  padding: 10px 0;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 0;
  margin: 0;
`;

const StyledLi = styled.li`
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }

  ${(props) =>
    props.active &&
    css`
      &:hover {
        color: #ff6347;
      }
    `}
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border-radius: 6px;
  border: 2px solid #ccc;
  box-sizing: border-box;
  margin-bottom: 15px;
`;

const StyledItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

const StyledItem = styled.p`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #d3d3d3;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 20px;
  text-align: center;
  font-size: 14px;
`;

function ClosingStock() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const quantityInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const itemList = [
    '01. Ellu Ulunthu Idly Podi',
    '02. Paruppu Rice Podi',
    '03. Karuveppillai Idly Podi',
    '04. Poondu Rice Podi',
    '05. Citron pickle',
    '06. Lemon Pickle',
    '07. Mango Pickle',
    '08. Tomato Rice Mix',
    '09. Curry Leave Rice Mix',
    '10. Coriander Leaves Rice Mix',
    '11. Onion Rice Mix',
    '12. Ginger Rice Mix',
    '13. Bittergourd Kulambu',
    '14. Theni Pepper Kulambu',
    '15. Kaaraikudi Kaara Kulambu',
    '16. Curry Leaves Garlic Kulambu',
    '17. Ladies Finger Vatha Kulambu',
    '18. Manathakkali Vatha Kulambu',
    '19. Gongura Thokku',
    '20. Tamarind Rice Mix',
    '21. Amla Pickle',
    '22. Mint Thokku',
    '23. Garlic Pickle',
    '24. Murungai Keerai Rice Podi',
    '25. Murungai Keerai Thokku',
    '26. Manathakkali Keerai Thooku',
    '27. Vendhaya Keerai Thokku',
    '28. Ginger Mango Pickle',
    '29. Chilly Idly Podi',
    '30. Pudina Idly Podi',
    '31. Tomato Pickle',
    '32. Kongunadu Vendhaya Kulambu',
    '33. Kovakkai Kulambu',
    '34. Andhra Paruppu Podi',
    '35. Chettinadu Katharikkai Kaara Kulambu',
    '36. Cashew(Dryfruits)',
    '37. Badam(Dryfruits)',
    '38. Pista(Dryfruits)',
    '39. DryGrapes(Dryfruits)',
    '40. Fig(Dryfruits)',
    '41. Akroot(Dryfruits)',
    '42. Dry Fruits and Nuts SPL Box',
    '43. Milk Bread',
    '44. Arabic Cookies',
    '45. Cold Coffee',
  ];

  const handleItemChange = (e) => {
    const inputValue = e.target.value;
    setItem(inputValue);
    const filtered = itemList.filter(
      (item) => item.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    );
    setFilteredItems(filtered);
    setSelectedIndex(-1);
    if (filtered.length === 0 && inputValue.trim().length > 0) {
      alert('No items matched.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      setItem(filteredItems[selectedIndex]);
      setFilteredItems([]);
      setSelectedIndex(-1);
      quantityInputRef.current.focus();
    }
  };

  const itemInputRef = useRef(null);

  const handleQuantitySubmit = async (e) => {
    if (e.key === 'Enter' && item && quantity) {
      const parsedQuantity = parseFloat(quantity);
      if (isNaN(parsedQuantity)) {
        alert('Quantity should be a number.');
        return;
      }
      const newItem = { item, quantity: parsedQuantity };
      try {
        await axios.post('http://localhost:3001/closingstock/add', {
          date,
          items: [newItem]
        });
        setItem('');
        setQuantity('');
        console.log('Closing added successfully:', newItem);
        alert('Closing added successfully');
        itemInputRef.current.focus();
      } catch (error) {
        console.error('Error adding closing data:', error);
      }
    }
  };

  const handleWindowClick = () => {
    setFilteredItems([]);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigation = (route) => {
    navigate(`/${route}`);
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <Container>
      <Navbar>
        <StyledUl>
          <StyledLi
            active={location.pathname === '/purchase'}
            onClick={() => handleNavigation('purchase')}
          >
            Purchase
          </StyledLi>

          <StyledLi
            active={location.pathname === '/sales'}
            onClick={() => handleNavigation('sales')}
          >
            Sales
          </StyledLi>

          <StyledLi
            active={location.pathname === '/closing'}
            onClick={() => handleNavigation('closing')}
          >
            Closing Stock
          </StyledLi>

          <StyledLi
            active={location.pathname === '/return'}
            onClick={() => handleNavigation('return')}
          >
           Return
          </StyledLi>

          <StyledLi
            active={location.pathname === '/closingdata'}
            onClick={() => handleNavigation('closingdata')}
          >
            Data
          </StyledLi>
          <StyledLi onClick={handleLogout}>Logout</StyledLi>
        </StyledUl>
      </Navbar>
      <MainContent>
        <br /><br /><br />  
        <h2>Shree Anandhas Sweets and Snacks - Sulur</h2>
        <h3>Closing Stock</h3>
        <div>
          <StyledInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <StyledInput
            ref={itemInputRef}
            type="text"
            placeholder="Item"
            value={item}
            onChange={handleItemChange}
            onKeyDown={handleKeyDown}
          />
          <StyledInput
            ref={quantityInputRef}
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyDown={handleQuantitySubmit}
          />
          <StyledItemList>
            {filteredItems.length > 0 &&
              filteredItems.map((filteredItem, index) => (
                <StyledItem
                  key={index}
                  onClick={() => {
                    setItem(filteredItem);
                    setFilteredItems([]);
                    setSelectedIndex(-1);
                    quantityInputRef.current.focus();
                  }}
                >
                  {filteredItem}
                </StyledItem>
              ))}
          </StyledItemList>
        </div>
      </MainContent>
      <Footer>
        <p>&copy; Ramadurai</p>
        <a
          href="https://ramadurai0722.github.io/Ramadurai-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact me
        </a>
      </Footer>
    </Container>
  );
}

export default ClosingStock;
