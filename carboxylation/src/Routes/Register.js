import './css/App.css';
//import { Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';
import React, { useState } from 'react';


function Register() {

  const [username, regUsername] = useState('');
  const [password, regPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Submitted username:', username);
    console.log('Submitted password:', password);
  };
  
  return (
    
  <div className="App">
    <div className="static-bar">
      <div className="left-content">
        <a href="/">
          <img src={Title} alt="Title" /> 
        </a>
      </div>
    </div>

     <div className="App-header">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => regUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => regPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">ENTER</button>
          
        </form>
      </div>
    </div>

  
    
  );
}

export default Register;