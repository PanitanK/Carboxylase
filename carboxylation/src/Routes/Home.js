import Title from './image/logo/CBX_Transparent.png';
import React from 'react';
import { useLocation , useNavigate } from 'react-router-dom';

function Home() {
  console.log("Home component is rendering"); // Add this line

  const location = useLocation();
  const { userUID } = location.state || {};
  const navigate = useNavigate();

  if (location.state == null) {
    console.log("USER IS NOT RECOGNIZED")
    navigate('/');
    return (
      <div className="App-header">
      <h1>UNAUTHORIZED ACCESS</h1>
      <a href='/login'> Click here to return </a>
      </div>
    ); 
}

  else  {
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
      <h1>Welcome to your homepage!</h1>
        <p>User UID: {userUID}</p>
            
      
      </div>
      </div>

      
    );
  }
}

export default Home;
