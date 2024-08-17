import React, { useState } from 'react';
import backgroundImage from '../images/assort.jpg';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Login successful!', data.user);
        navigate('/Purchase');
      } else {
        setError(data.message);
        alert(data.message);
      }
    } catch (error) {
      setError('An error occurred, please try again.');
      alert('An error occurred, please try again.');
    }
  };

  return (
    <div style={containerStyle}>
    <h1 style={headerStyle}>Shree Aanandhas Sweets & Snacks - Sulur</h1>
      <h2 style={{ ...titleStyle, fontSize: '3em' }}>Login</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>

        <label htmlFor="username" style={labelStyle}>Username:</label>
        <select
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ ...inputStyle, fontSize: '18px', color: '#333' }}
        >
          <option value="">Username</option>
          <option value="admin">admin</option>
          <option value="biller1">biller1</option>
        </select>
        <br />

        <label htmlFor="password" style={labelStyle}>Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...inputStyle, fontSize: '18px', color: '#333' }}
        />
        <br />
        <button type="submit" style={{ ...buttonStyle, fontSize: '18px', color: '#fff' }}>Login</button>
      </form>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
};
const headerStyle = {
    textAlign: 'center',
    color: '#F9D423',
    fontSize: '3em',
    paddingTop: '1px', 
  };
const titleStyle = {
    color: '#F9D423',
    fontSize: '3em', 
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    border: '3px solid white',
    padding: '20px',
    width: '25%',
    backgroundColor:'#DFE9F3',
  };

const labelStyle = {
  marginBottom: '5px',
  color: 'black',
  fontSize:'1.5em'
};

const inputStyle = {
    marginBottom: '15px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1.2em', 
    color: 'black', 
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.2em', 
  };

const errorStyle = {
  color: 'red',
};

export default LoginForm;
