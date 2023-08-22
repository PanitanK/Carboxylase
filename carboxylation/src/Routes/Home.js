import Title from './image/logo/CBX_Transparent.png';
import Gear from './image/logo/gear.png';

import Placeholder from './image/logo/Placeholder.png'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './Firebase';
import {  collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Setting from './Setting'; 
import PlotComponent from './PlotComponent';
import StaticMapComponent from './StaticMapComponent';

function Home() {
  //var fetchcount = 0;
  const location = useLocation();
  const userCollectionRef = collection(db, 'USERS');
  const { userUID } = location.state || {};
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [HasFetched, setFetch] = useState(false);
  const [showSetting, setShowSetting] = useState(false); // State to track whether to show Setting component
  const [plotDocuments, setplotDocuments] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);
  const [MaximumCredit , setMaximumCredit] = useState(0);

  
 
  const fetchPlotDocuments = async (userUID) => {
    const dataCollectionRef = collection(db, 'USERS', userUID, 'DataCollection');
  
    try {
      const querySnapshot = await getDocs(dataCollectionRef);
      const plotDocuments = querySnapshot.docs
        .filter((doc) => doc.id.startsWith('PlotNO_'))
        .map((doc) => doc.data());
        
      return plotDocuments;
    } catch (error) {
      console.error('Error fetching plot documents:', error);
      return [];
    }
  };
  


  const PlotReg = () => {
    navigate('/Plotregister',{ state: { userUID } });
  };

  const handleGearClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleDataUpdate = () => {
    setFetch(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(userCollectionRef, userUID);
        const userDocSnapshot = await getDoc(userDocRef);
        const plotDocuments = await fetchPlotDocuments(userUID);
        //console.log('Plot Documents:', plotDocuments[1].Plot_Number);
        setplotDocuments(plotDocuments)

        var sum = 0;
        for (let i = 0; i < plotDocuments.length; i++) {
          sum = sum + ((44/12)*((plotDocuments[i].Area / 0.0016)*230*0.65 * 0.8825  / (1000)))
        }

  setMaximumCredit(sum)
        if (userDocSnapshot.exists()) {
          const USERS_UID_SubCollection = collection(userDocRef, 'ProfileCollection');
          const USERS_UID_SubCollection_Snapshot = await getDocs(USERS_UID_SubCollection);

          const userData = USERS_UID_SubCollection_Snapshot.docs.map((doc) => doc.data());
          setUserData(userData);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    if (!HasFetched){
      fetchData();
      setFetch(true)
    }
  }, [userUID, userCollectionRef, HasFetched]); 

  if (location.state == null) {
    console.log("USER IS NOT RECOGNIZED");
  
    return (
      <div className="App-header">
        <h1>UNAUTHORIZED ACCESS</h1>
        <a href='/login'> Click here to return </a>
      </div>
    );
  } 
  
  else if (!userData) {
    return <div className="App-header">Loading...</div>;
  } 
  
  else {
    return (
      <div className="App">
        <div className="static-bar">
          <div className="left-content">
          <img
            src={Title}
            alt="Title"
            onClick={() => {
              navigate('/Home', { state: { userUID } });
              setShowSetting(false);
            }}
            style={{ cursor: 'pointer' }} 
          />
          </div>
          <div className="right-content">
            {userData && userData.length > 0 ? (
              <h2>USER : {userData[0].Name}</h2>
            ) : (
              <h2>User data not available</h2>
            )}
            <div className="gear-link" onClick={handleGearClick}>
              <img src={Gear} alt="Gear" className="gear" />
              {showDropdown && (
                <div className="dropdown">

                  <button onClick={() => {
                    navigate('/Home', { state: { userUID } })
                    setShowSetting(false); }
                  }>
                    Home
                  </button>

                  <button onClick={() => {
                    navigate('/Print', { state: { userUID,userData, plotDocuments, MaximumCredit } })
                    setShowSetting(false); }
                  }>
                    Print
                  </button>

                  <button
                    onClick={() => {
                      setShowSetting(true); 
                      navigate('/Home/Setting', { state: { userUID } });
                    }}
                  >
                    Setting
                  </button>

                  <button onClick={() => navigate("/")}>
                    Logout  
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>

        <div className="App-header">
        {showSetting ? (
          <Setting userUID={userUID} onDataUpdate={handleDataUpdate} /> 
        ) : (

          <div className='Home-Page'>
            <h1 class="primary-header10">Welcome back {userData[0].Name}</h1>
            <p class="primary-header5">Your Hometown is {userData && userData[0].Hometown}</p>
            


            <div className="credential-box">
              <div className='StaticMapBox'>
                <StaticMapComponent initialCenter={{ lat: userData[0].Latitude, lng: userData[0].Longitude,PlotDoc:plotDocuments }} />  
              </div>

             
              <div className="info-container">
              <img className="image" src={Placeholder} alt="Placeholder"></img>
                <div>
                  <span className="info-label">Firstname :</span>
                  <span className="info-value">{userData[0].FirstName}</span>
                </div>
                <div>
                  <span className="info-label">Lastname :</span>
                  <span className="info-value">{userData[0].LastName}</span> 
                </div>
                <div>
                  <span className="info-label">Issued Date:</span>
                  <span className="info-value">{userData[0].Created_Date}</span>
                </div>
                <div>
                  <span className="info-label">Expiration Date:</span>
                  <span className="info-value">{userData[0].Expiry_Date}</span>
                </div>
                <div>
                  <span className="info-label">Province of Issued :</span>
                  <span className="info-value">{userData[0].Hometown}</span>
                </div>
                <div>
                  <span className="info-label">Credit owned : </span>
                  <span className="Credit-own">{userData[0].Credit_Own}</span>
                  <span className="info-label"> Credits</span>
                </div>

                <div>
                  <span className="info-label">Maximum Credit Cap: </span>
                  <span className="Credit-own">{MaximumCredit.toFixed(2)}</span>
                  <span className="info-label"> Credits/year</span>
                </div>

              </div>
            </div>


          {plotDocuments.map((plot, index) => (
          <PlotComponent key={`${plot.id}-${index}`} plot={plot} plotIndex={index + 1} />
        ))}
           <div className='AddPlot'>  
            <button class="submit-button" onClick={PlotReg} >+ Add New Plot</button>
          </div>
        </div>
   
        )}
        <footer className="footer">
        <p></p>
        </footer>
      </div>
    </div>
    );
  }
}

export default Home;

