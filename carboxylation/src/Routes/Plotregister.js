import './css/App.css';
//import { Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  db  } from './Firebase';

import {  doc, setDoc } from 'firebase/firestore';
//import {  ref , uploadBytes} from 'firebase/storage';

function PlotRegister() {

 
  const [Plotname, regPlotname] = useState('');

  
  const [ErrMSG, setErrMsg] = useState(null);
  
  const navigate = useNavigate();
  const { userUID } = window.location.state || {};
  const [showSetting, setShowSetting] = useState(false); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleGearClick = () => {
    setShowDropdown(!showDropdown);
  };


  const createUserDocumentAndSubcollections = async (userId, dataCollection) => {
    try {
      const dataDocumentId = 'PlotNO'; // Replace with your desired custom document ID
      const dataDocumentRef = doc(db, 'USERS', userId, 'DataCollection', dataDocumentId);
      await setDoc(dataDocumentRef, dataCollection);
    } catch (error) {
      console.error('Error creating user document and subcollections: ', error);
    }
  };

  const Reg = async (event) => {
    event.preventDefault();
    try {
      
      setErrMsg(null);
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
      const year = currentDate.getFullYear();

    
      const PlotCollection = { 
        Plot_Credential: 'NULL',
        Session_Created: `${day}/${month}/${year}`,
        Session_Expiry: `${day}/${month+3}/${year}`,
        Plotname : Plotname,
        PlotCenter : (8.435164926  ,  99.95782950 ),

        Plotpolygon : [

          (8.435164926  ,  93.95782950 ),
          (4.435164926  ,  99.94782950 ),
          (3.435164926  ,  99.15782950 ),
          (7.435164926  ,  99.25782950 )
        
        ],

        Area : "",
        PlotAge: 8,

        

      
      };


      // Create user document and storage folder simultaneously
      await Promise.all([
        createUserDocumentAndSubcollections(userUID, PlotCollection),
       
      ]);

    } catch (error) {
 
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrMsg(errorCode + "  " + errorMessage);
    
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

      <div className="right-content">
            {userData && userData.length > 0 ? (
              <h2>USER : {userData[0].Name}</h2>
            ) : (
              <h2>User data not available</h2>
            )}
            <div className="gear-link" onClick={handleGearClick}>
              
            </div>
         

      </div>

    </div>

     <div className="App-header">
        <h1>Register</h1>
        
        <form onSubmit={Reg}>
          
          <div>
            <label htmlFor="Plotname">Plotname:</label>
            <input
              type="text"
              id="Plotname"
              value={Plotname}
              onChange={(e) => regPlotname(e.target.value)}
              required
            />
          </div>
          
          <p>{ErrMSG}</p>
          <button type="submit">ENTER</button>
          
        </form>
      </div>
    </div>

  
    
  );
}

export default PlotRegister;