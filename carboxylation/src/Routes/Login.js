import './css/App.css';
import { Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';
import React, { useState } from 'react';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here, e.g., send the username and password to the server for validation
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
        <h1>Login page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {/* Add a link to a "Forgot Password" page if needed */}
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>

  
    
  );
}

export default Login;