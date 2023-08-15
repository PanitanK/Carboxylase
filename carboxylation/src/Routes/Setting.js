import React, { useState, useEffect } from 'react';
import { db } from './Firebase';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import Gmap from './Gmap';

function Setting({ userUID, onDataUpdate }) {
    const [HasFetched, setFetch] = useState(false);
    const [userData, setUserData] = useState(null);
    const userCollectionRef = collection(db, 'USERS');
    const [inputValues, setInputValues] = useState({}); // State for input values
    const [ErrorMSG, setErrorMSG] = useState(''); // State for input values
    const desiredOrder = ['Name',  'Hometown' ];

    

    const handleLocationUpdate = (newLocation) => {
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          Latitude: newLocation.lat,
          Longitude: newLocation.lng,
        }));
      };

    const handleSubmit = async () => {
        console.log(inputValues)
        setErrorMSG("")
        if (Object.keys(inputValues).length  < 1 ) {
           
            setErrorMSG("There is no changes")
            return 
        }

        console.log("THIS IS userData[0] : ", Object.keys(userData[0]) )
        const result = await dbUpdate(inputValues);
        
        if (result) {
            
            setErrorMSG("Update successful");
            setFetch(false)
            onDataUpdate(); 
            
        } else {
           
            setErrorMSG("Update failed");
        }
    };

    
    
    const dbUpdate = async (data) => {
        try {
            const userDocRef = doc(userCollectionRef, userUID);
            const profileQuerySnapshot = await getDocs(collection(userDocRef, 'ProfileCollection'));
            
            if (!profileQuerySnapshot.empty) {
                const profileDoc = profileQuerySnapshot.docs[0];
                const profileDocRef = doc(userDocRef, 'ProfileCollection', profileDoc.id);
                
                await updateDoc(profileDocRef, data);
                
                console.log("Document updated successfully");
                return true; // Return true to indicate success
            } else {
                console.log("No profile document found.");
                return false; // Return false to indicate failure
            }
        } catch (error) {
            console.error("Error updating document:", error);
            return false; // Return false to indicate failure
        }
    };

    function handleInputChange(key, value) {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [key]: value
        }));
    }

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
        
        if (!HasFetched) {
            fetchData();
            setFetch(true);
        }
    }, [userUID, userCollectionRef, HasFetched]);

    if (!userData) {
        return <h1>THIS IS UID : {userUID}</h1>;
    }

    const initialCenter = {
        lat: parseFloat(userData[0]?.Latitude || 0), // Default to 0 if not available
        lng: parseFloat(userData[0]?.Longitude || 0), // Default to 0 if not available
      };
    // Render the editable fields using input boxes
    return (
        <div className="setting-container">
          
            <div className="text-input">
            <div className="primary-header1"><h1>Default User Settings</h1></div>
              {desiredOrder.map((key) => (
                
                
                  <span>
                  <label> {key} : </label>
                  <input
                    type="text"
                    value={inputValues[key] != null ? inputValues[key] : userData[0][key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                  </span>
                
                
              ))}
              <div className="gmap-container">
                <div className='Location-Map'>
                  <Gmap initialCenter={initialCenter} onLocationUpdate={handleLocationUpdate} />
                </div>
              </div>
            
            
          </div>
      
          <button onClick={handleSubmit}class="submit-button">Save Changes</button>
          <p>{ErrorMSG}</p>
        </div>
      );
    }

export default Setting;
