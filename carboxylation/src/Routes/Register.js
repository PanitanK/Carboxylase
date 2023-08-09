import './css/App.css';
//import { Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { auth,db } from './Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  collection, addDoc, doc, setDoc } from 'firebase/firestore';



function Register() {

  const [email, regEmail] = useState('');
  const [password, regPassword] = useState('');
  const [ErrMSG, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const createUserDocumentAndSubcollections = async (userId, dataCollection, profileData) => {
    try {
      // Create user document using UID
      const userDocRef = doc(db, 'USERS', userId);
      await setDoc(userDocRef, {});
  
      // Create DataCollection subcollection
      const dataCollectionRef = collection(db, 'USERS', userId, 'DataCollection');
      await addDoc(dataCollectionRef, dataCollection);
      console.log('DataCollection document created');
  
      // Create ProfileCollection subcollection
      const profileCollectionRef = collection(db, 'USERS', userId, 'ProfileCollection');
      await addDoc(profileCollectionRef, profileData);
      console.log('ProfileCollection document created');
    } catch (error) {
      console.error('Error creating user document and subcollections: ', error);
    }
  };
  const Reg = async (event) => {
    event.preventDefault();
    console.log('Submitted username:', email);
    console.log('Submitted password:', password);


    try {
      createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
        // The user has been successfully created. You can access the user data as follows:

        const user = userCredential.user;
        //console.log("New user created:", user);



        setErrMsg(null);

        const dataCollection = { Credential: 'NULL' };
        const profileData = { Name: 'NEW_USER', Hometown: 'NULL' };
        createUserDocumentAndSubcollections(user.uid, dataCollection, profileData).then(() => {
          console.log('Subcollection document creation successful');
          navigate('/login');
        })
        .catch((error) => {
          console.error('Subcollection document creation error: ', error);
        });
        

        

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

      <div className="right-content">
        
        <Link to="/Login">
          <button>Login</button>
        </Link>

        <Link to="/Register">
          <button>Register</button>
        </Link>

      </div>

    </div>

     <div className="App-header">
        <h1>Register</h1>
        
        <form onSubmit={Reg}>
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => regEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => regPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/Login">Already a user ?</Link>
          <p>{ErrMSG}</p>
          <button type="submit">ENTER</button>
          
        </form>
      </div>
    </div>

  
    
  );
}

export default Register;