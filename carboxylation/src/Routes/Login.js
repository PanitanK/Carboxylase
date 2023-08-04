import './css/App.css';
import Title from './image/logo/CBX_Transparent.png';

import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ErrMSG, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const Log = async (event) => {
    event.preventDefault();
    console.log('Submitted username:', email);
    console.log('Submitted password:', password);


    try {
      signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
        // The user has been successfully created. You can access the user data as follows:

        const user = userCredential.user;
        //console.log("New user created:", user);
        setErrMsg(null);
        navigate('/login');

      }).catch((error) => {
    // Handle any errors that occur during user creation
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrMsg(errorCode + "  " + errorMessage);
    
    // You can display the error message to the user or perform other error handling tasks.
  });
     
    } catch (error) {
      console.error("Error creating user:");
    }
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
        <Link to="/Register">Don't have an account?</Link>
        <form onSubmit={Log}>
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="text"
              id="Email"
              value={email}
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
          <p>{ErrMSG}</p>
          <Link to="/forgot-password">Forgot Password?</Link>
          <button type="submit">Login</button>
        </form>
        {/* Add a link to a "Forgot Password" page if needed */}
        
      </div>
    </div>

  
    
  );
}

export default Login;