import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import '../Styles/Purchasedata.css'; 

const NavbarContainer = styled.nav`
  background-color: #333; 
  padding: 18px 0; 
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
  color: white; 
  font-size:20px;
  &:hover {
    text-decoration: underline;
    color: #ff6347; 
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigation = (route) => {
    navigate(`/${route}`);
  };

  return (
    <NavbarContainer>
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

        <StyledLi onClick={handleLogout}>Logout</StyledLi>
      </StyledUl>
    </NavbarContainer>
  );
};

function Saledata() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewData, setViewData] = useState([]);
  const itemList = [
    { value: '01. Ellu Ulunthu Idly Podi', label: 'Ellu Ulunthu Idly Podi' },
    { value: '02. Paruppu Rice Podi', label: 'Paruppu Rice Podi' },
    { value: '03. Karuveppillai Idly Podi', label: 'Karuveppillai Idly Podi' },
    { value: '04. Poondu Rice Podi', label: 'Poondu Rice Podi' },
    { value: '05. Citron pickle', label: 'Citron pickle' },
    { value: '06. Lemon Pickle', label: 'Lemon Pickle' },
    { value: '07. Mango Pickle', label: 'Mango Pickle' },
    { value: '08. Tomato Rice Mix', label: 'Tomato Rice Mix' },
    { value: '09. Curry Leave Rice Mix', label: 'Curry Leave Rice Mix' },
    { value: '10. Coriander Leaves Rice Mix', label: 'Coriander Leaves Rice Mix' },
    { value: '11. Onion Rice Mix', label: 'Onion Rice Mix' },
    { value: '12. Ginger Rice Mix', label: 'Ginger Rice Mix' },
    { value: '13. Bittergourd Kulambu', label: 'Bittergourd Kulambu' },
    { value: '14. Theni Pepper Kulambu', label: 'Theni Pepper Kulambu' },
    { value: '15. Kaaraikudi Kaara Kulambu', label: 'Kaaraikudi Kaara Kulambu' },
    { value: '16. Curry Leaves Garlic Kulambu', label: 'Curry Leaves Garlic Kulambu' },
    { value: '17. Ladies Finger Vatha Kulambu', label: 'Ladies Finger Vatha Kulambu' },
    { value: '18. Manathakkali Vatha Kulambu', label: 'Manathakkali Vatha Kulambu' },
    { value: '19. Gongura Thokku', label: 'Gongura Thokku' },
    { value: '20. Tamarind Rice Mix', label: 'Tamarind Rice Mix' },
    { value: '21. Amla Pickle', label: 'Amla Pickle' },
    { value: '22. Mint Thokku', label: 'Mint Thokku' },
    { value: '23. Garlic Pickle', label: 'Garlic Pickle' },
    { value: '24. Murungai Keerai Rice Podi', label: 'Murungai Keerai Rice Podi' },
    { value: '25. Murungai Keerai Thokku', label: 'Murungai Keerai Thokku' },
    { value: '26. Manathakkali Keerai Thooku', label: 'Manathakkali Keerai Thooku' },
    { value: '27. Vendhaya Keerai Thokku', label: 'Vendhaya Keerai Thokku' },
    { value: '28. Ginger Mango Pickle', label: 'Ginger Mango Pickle' },
    { value: '29. Chilly Idly Podi', label: 'Chilly Idly Podi' },
    { value: '30. Pudina Idly Podi', label: 'Pudina Idly Podi' },
    { value: '31. Tomato Pickle', label: 'Tomato Pickle' },
    { value: '32. Kongunadu Vendhaya Kulambu', label: 'Kongunadu Vendhaya Kulambu' },
    { value: '33. Kovakkai Kulambu', label: 'Kovakkai Kulambu' },
    { value: '34. Andhra Paruppu Podi', label: 'Andhra Paruppu Podi' },
    { value: '35. Chettinadu Katharikkai Kaara Kulambu', label: 'Chettinadu Katharikkai Kaara Kulambu' },
    { value: '36. Cashew(Dryfruits)', label: 'Cashew(Dryfruits)' },
    { value: '37. Badam(Dryfruits)', label: 'Badam(Dryfruits)' },
    { value: '38. Pista(Dryfruits)', label: 'Pista(Dryfruits)' },
    { value: '39. DryGrapes(Dryfruits)', label: 'DryGrapes(Dryfruits)' },
    { value: '40. Fig(Dryfruits)', label: 'Fig(Dryfruits)' },
    { value: '41. Akroot(Dryfruits)', label: 'Akroot(Dryfruits)' },
    { value: '42. Dry Fruits and Nuts SPL Box', label: 'Dry Fruits and Nuts SPL Box' },
    { value: '43. Milk Bread', label: 'Milk Bread' },
    { value: '44. Arabic Cookies', label: 'Arabic Cookies' },
    { value: '45. Cold Coffee', label: 'Cold Coffee' },
  ];
  

  const fetchData = async () => {
    try {
      if (!fromDate) {
        console.error('Please select a From Date');
        return;
      }
      if (!toDate) {
        console.error('Please select a To Date');
        return;
      }

      let url = `http://localhost:3001/sales/filtered-data?date=${fromDate}&toDate=${toDate}`;

      if (selectedItems.length > 0) {
        const itemNames = selectedItems.map(item => item.value).join(',');
        url += `&itemName=${itemNames}`;
      }

      const response = await axios.get(url);
      setViewData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGenerate = () => {
    fetchData();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div><br /> <Navbar />
    <div className="purchase-data-container">
      <h2 className="purchase-data-heading">Sales Data</h2> 
      <div className="date-inputs-container"> 
        <div className="date-input">
          <label>From Date:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="date-input">
          <label>To Date:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
      </div>
      <div className="select-items-container">
        <label>Select Items:</label>
        <Select
          isMulti
          value={selectedItems}
          onChange={setSelectedItems}
          options={itemList}
          className="select-items" 
          classNamePrefix="select-items" 
        />
      </div>
      <button className="generate-button" onClick={handleGenerate}>Generate</button> 
      <div className="data-display-container"> 
        {viewData.map((data, index) => (
          <div key={index} className="data-item-container"> 
            <p>Date: {formatDate(data.date)}</p> 
            <ul>
              {data.items.map((item, i) => (
                <li key={i}>
                  Item: {item.item}, Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div></div>

  );
}

export default Saledata;