import './css/App.css';
//import { Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';
import placeholderImage from './image/logo/Placeholder.png';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { auth , db ,storage } from './Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  doc, setDoc } from 'firebase/firestore';
import {  ref , uploadBytes} from 'firebase/storage';


function Register() {

 
  const [email, regEmail] = useState('');
  const [password, regPassword] = useState('');
  const [ErrMSG, setErrMsg] = useState(null);
  const [Firstname,regFirstName] = useState('');
  const [Lastname,regLastName] = useState('');
  const navigate = useNavigate();

  const createUserFolder = async (userId) => {
    try {
      // Create a user-specific folder using the user's UID
      const userFolderRef = ref(storage,  userId + '/');
      uploadBytes(userFolderRef , placeholderImage  ).then(()=>{
        console.log("Uploaded")

      })

  
     

    } catch (error) {
      console.error('Error creating user folder: ', error);
    }
  };

  const createUserDocumentAndSubcollections = async (userId, dataCollection, profileData) => {
    try {
      // Create user document using UID
      const userDocRef = doc(db, 'USERS', userId);
      await setDoc(userDocRef, {});
  
      const dataDocumentId = 'Credential_Data'; // Replace with your desired custom document ID
      const dataDocumentRef = doc(db, 'USERS', userId, 'DataCollection', dataDocumentId);
      await setDoc(dataDocumentRef, dataCollection);
  
      const profileDocumentId = 'Profile_Data'; // Replace with your desired custom document ID
      const profileDocumentRef = doc(db, 'USERS', userId, 'ProfileCollection', profileDocumentId);
      await setDoc(profileDocumentRef, profileData);
  
    } catch (error) {
      console.error('Error creating user document and subcollections: ', error);
    }
  };

  const Reg = async (event) => {
    event.preventDefault();
    //console.log('Submitted username:', email);
    //console.log('Submitted password:', password);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setErrMsg(null);
      const currentDate = new Date();

      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
      const year = currentDate.getFullYear();

      

      const dataCollection = { Credential: 'NULL' };

      const profileData = { 
        Name: Firstname + " " + Lastname,
        FirstName:Firstname , 
        LastName:Lastname , 
        Hometown: 'Unknown' , 
        Latitude : 8.435164926  , 
        Longitude : 99.95782950 , 
        Credit_Own : 0 ,
        Created_Date : `${day}/${month}/${year}`,
        Expiry_Date : `${day}/${month}/${year+1}`

      
      };

      // Create user document and storage folder simultaneously
      await Promise.all([
        createUserDocumentAndSubcollections(user.uid, dataCollection, profileData),
        createUserFolder(user.uid)
      ]);

      //console.log('Both Firebase and Storage operations are successful');
      navigate('/login');
    } catch (error) {
      // Handle any errors that occur during user creation
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrMsg(errorCode + "  " + errorMessage);
      // You can display the error message to the user or perform other error handling tasks.
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
            <label htmlFor="First_Name">Firstname:</label>
            <input
              type="text"
              id="Firstname"
              value={Firstname}
              onChange={(e) => regFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Last_Name">Lastname:</label>
            <input
              type="text"
              id="Lastname"
              value={Lastname}
              onChange={(e) => regLastName(e.target.value)}
              required
            />
          </div>
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