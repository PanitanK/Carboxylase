import Title from './image/logo/CBX_Transparent.png';
import Gear from './image/logo/gear.png';

import Placeholder from './image/logo/Placeholder.png'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './Firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Setting from './Setting'; // Import the Setting component
import PlotComponent from './PlotComponent';

function Home() {
  //var fetchcount = 0;
  const location = useLocation();
  const userCollectionRef = collection(db, 'USERS');
  const { userUID } = location.state || {};
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [HasFetched, setFetch] = useState(false);
  const [showSetting, setShowSetting] = useState(false); // State to track whether to show Setting component

  const [showDropdown, setShowDropdown] = useState(false);

  const plotDataObjects = [
    { carbonAbsorption: 50, expectedCarbonCredit: 0.05 },
    // Add more plot data objects as needed
  ];
  
  



  /*const handleGearClick = () => {
    setFetch(false)
    setShowSetting((prevShowSetting) => !prevShowSetting); // Toggle showSetting state
    if (!showSetting) {
      navigate('/Home/Setting', { state: { userUID } });
    } else {
      navigate('/Home', { state: { userUID } });
    }
  };*/

  

  const handleGearClick = () => {
    setShowDropdown(!showDropdown);
  };


  const handleDataUpdate = () => {
    setFetch(false); // This will trigger a re-fetch in the useEffect of Home
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(userCollectionRef, userUID);
        const userDocSnapshot = await getDoc(userDocRef);

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

    //console.log("ABOUT TO FETCH");
    if (!HasFetched){
      //console.log("FETCHING " )
      fetchData();
      setFetch(true)
    
    }
    //console.log("FETCHED");
  }, [userUID, userCollectionRef, HasFetched]); 

  if (location.state == null) {
    console.log("USER IS NOT RECOGNIZED");
  
    return (
      <div className="App-header">
        <h1>UNAUTHORIZED ACCESS</h1>
        <a href='/login'> Click here to return </a>
      </div>
    );
  } else if (!userData) {
    return <div className="App-header">Loading...</div>;
  } else {
    //console.log(userData); // Log the entire userData for debugging purposes

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
            style={{ cursor: 'pointer' }} // Add cursor style here
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
                  <button onClick={() => navigate('/Home/Profile', { state: { userUID } })}>
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowSetting(true); // Change the state here
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
            <h1>Welcome to your homepage!</h1>
            <p>Your Home town is {userData && userData[0].Hometown}</p>

            <div className="credential-box">
              <img className="image" src={Placeholder} alt="Placeholder"></img>
              <div className="info-container">
                <div className="header">Credential Info</div>
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


              </div>
            </div>

          <div className="big-container">
          
          {plotDataObjects.map((plotData, index) => (
            <PlotComponent
              key={'525'} // Make sure to provide a unique key
              plotData={plotData}
              plotIndex={'525'}
            />
          ))}
            

          <div className='AddPlot'>  
            <button className='addPlotButton'>+ Add New Plot</button>
          </div>

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

