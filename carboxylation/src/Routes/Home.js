import Title from './image/logo/CBX_Transparent.png';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './Firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

function Home() {
  const location = useLocation();
  const userCollectionRef = collection(db, 'USERS');
  const { userUID } = location.state || {};
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [HasFetched, setFetch] = useState(false);

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

    console.log("ABOUT TO FETCH");
    if (!HasFetched){
      fetchData();
      setFetch(true)
    }
    console.log("FETCHED");
  }, [userUID, userCollectionRef, HasFetched]); 

  if (location.state == null) {
    console.log("USER IS NOT RECOGNIZED");
    navigate('/');
    return (
      <div className="App-header">
        <h1>UNAUTHORIZED ACCESS</h1>
        <a href='/login'> Click here to return </a>
      </div>
    );
  } else if (!userData) {
    return <div>Loading...</div>;
  } else {
    console.log(userData); // Log the entire userData for debugging purposes

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
          </div>
        </div>

        <div className="App-header">
          <h1>Welcome to your homepage!</h1>
          <p>Your Home town is {userData[0].Hometown}</p>
        </div>
      </div>
    );
  }
}

export default Home;
