import './css/App.css';
import Title from './image/logo/CBX_Transparent.png';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './Firebase';
import { doc, setDoc,collection,getDocs} from 'firebase/firestore';

import BermudaTriangleMap from './Bermuda';

function PlotRegister() {
  const [Plotname, regPlotname] = useState('');
  const [ErrMSG, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userUIDProp = location.state ? location.state.userUID : null;
  const [userUID, setUserUID] = useState(userUIDProp || ''); 
  const [userUIDinput, setUserUIDinput] = useState(''); 
  const [showPlotInput, setShowPlotInput] = useState(false);

  useEffect(() => {
    console.log(userUID)
    if (userUID) {
      console.log('userUID OK')
      setShowPlotInput(true);
    }
  }, [userUID]);

  const AddPlotToDB = async (userId,dataDocumentId, PlotCollection) => {
    console.log("Trying AddPlotToBD")
    try {
      
      const dataDocumentRef = doc(
        db,
        'USERS',
        userId,
        'DataCollection',
        dataDocumentId
      );
      await setDoc(dataDocumentRef, PlotCollection,dataDocumentId);
    } catch (error) {
      console.error('Error creating user document and subcollections: ', error);
    }
  };

  const handleUserUIDSubmit = (event) => {
    event.preventDefault();
    setUserUID(userUIDinput);
    setShowPlotInput(true); // Show the Plotname input form
  };

  const handlePlotnameSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrMsg(null);

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();

      const dataCollectionRef = collection(db, 'USERS', userUID, 'DataCollection');
      const dataCollectionSnapshot = await getDocs(dataCollectionRef);
      const documentCount = dataCollectionSnapshot.size;
  
      // Construct the document ID with an incremented number
      console.log("THIS IS HOW MANY Data " , documentCount)

      const dataDocumentId = `PlotNO_${documentCount}`;
      console.log("This is dataDocutmentId")
      const PlotCollection = {
        Plot_Number : documentCount,
        Plotname: Plotname,
        Plot_Credential: 'NULL',
        Session_Created: `${day}/${month}/${year}`,
        Session_Expiry: `${day}/${month + 3}/${year}`,
        PlotCenter: [8.435164926, 99.9578295],

        Plotpolygon: [
          { lat: 8.435164926, lng: 93.9578295 },
          { lat: 4.435164926, lng: 99.9478295 },
          { lat: 3.435164926, lng: 99.1578295 },
          { lat: 7.435164926, lng: 99.2578295 },
        ],

        Area: 55,
        PlotAge: 8,
      };

      await AddPlotToDB(userUID, dataDocumentId, PlotCollection);
      console.log("CREATED PLOT NAME " , dataDocumentId)
      navigate('/Protected', { state: { userUID } });
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrMsg(errorCode + '  ' + errorMessage);
    }
    
  };
  
  return (
    <div className="App">
      <div className="static-bar">
        <div className="left-content">
          
            <img src={Title} alt="Title" onClick={() => {
              navigate('/Home', { state: { userUID } });
            
            }} />
       
        </div>
      </div>

      <div className="App-header">
        <h1>Plot Registration</h1>

        {!userUID && (
          <div>
            <label htmlFor="userUIDInput">Enter User UID:</label>
            <input
              type="text"
              id="userUIDinput"
              value={userUIDinput}
              onChange={(e) => setUserUIDinput(e.target.value)}
              required
            />
            <button type="submit" onClick={handleUserUIDSubmit}>Submit UID</button>
          </div>
        )}

        {showPlotInput && (
          <form onSubmit={handlePlotnameSubmit}>
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

            <div>
              <label htmlFor="PlotAge">Plot Age:</label>
              <input
                
                
            
              />
            </div>
            <div>
              <BermudaTriangleMap/>
            </div>
            <p>{ErrMSG}</p>
            <button type="submit">ENTER</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PlotRegister;
