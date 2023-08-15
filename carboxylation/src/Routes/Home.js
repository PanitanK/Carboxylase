import Title from './image/logo/CBX_Transparent.png';
import Gear from './image/logo/gear.png';
import ToggleArrow from './image/svg/Dasharrow.svg'
import Placeholder from './image/logo/Placeholder.png'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './Firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Setting from './Setting'; // Import the Setting component


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

  const [collapseState, setCollapseState] = useState({
    container1: true,
    // Add more containers if needed
  });
  const toggleCollapse = (containerName) => {
    setCollapseState((prevState) => ({
      ...prevState,
      [containerName]: !prevState[containerName],
    }));
  };
  



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

            <div class="credential-box">
              <img class="image" src={Placeholder} alt="Placeholder"></img>
              <div class="info-container">
                <div class="header">Credential Info</div>
                <div>
                  <span class="info-label">Firstname :</span>
                  <span class="info-value">{userData[0].FirstName + " " + userData[0].LastName}</span>
                </div>
              
              
                <div>
                  <span class="info-label">Expiration Date:</span>
                  <span class="info-value">5/5/2025</span>
                </div>
                <div>
                  <span class="info-label">Province of Issued :</span>
                  <span class="info-value">{userData[0].Hometown}</span>
                </div>
              </div>
            </div>

          <div className="big-container">

            <div className="small-container">
              <div className='Container-Header'>
                  <div className="toggle-button">
                    <span onClick={() => toggleCollapse("container1")}>
                      <img
                        className={'arrow'}
                        src={ToggleArrow}
                        alt="Toggle Arrow"
                      />
                    </span>
                  </div>
                <span>Plot No2</span>
                <img src={Gear} alt="Gear" className="gear" />
              </div>

              <div className={`content ${collapseState.container1 ? "collapsed" : ""}`}>
                <p>Carbon Absorbtion 50 kg</p>
                <p>Expected Carbon Credit Generated 0.05 Credit</p>
            </div>
          </div>

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

