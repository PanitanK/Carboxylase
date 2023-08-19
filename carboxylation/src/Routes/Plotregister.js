import './css/App.css';
import Title from './image/logo/CBX_Transparent.png';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './Firebase';
import { doc, setDoc,collection,getDocs} from 'firebase/firestore';



function PlotRegister() {
  const [Plotname, regPlotname] = useState('');
  const [PlotAge , regPlotAge] = useState(0);
  const [ErrMSG, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userUIDProp = location.state ? location.state.userUID : null;
  const [userUID, setUserUID] = useState(userUIDProp || ''); 
  const [userUIDinput, setUserUIDinput] = useState(''); 
  const [showPlotInput, setShowPlotInput] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  
  useEffect(() => {
    console.log(userUID);
    if (userUID) {
      console.log('userUID OK');
      setShowPlotInput(true);
    }

    const receiveMessage = (event) => {
      if (event.data.type === 'polygonCoordinates') {
        const receivedCoordinates = event.data.coordinates;
        setPolygonCoordinates(receivedCoordinates);
        console.log(polygonCoordinates);
      }
    };

    window.addEventListener('message', receiveMessage);

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [userUID, polygonCoordinates]);

  

  const calculatePolygonArea = (coords) => {
    if (coords.length < 3) return 0;

    let area = 0;

    for (let i = 0; i < coords.length; i++) {
      const curr = coords[i];
      const next = coords[(i + 1) % coords.length];

      area += (next.lng + curr.lng) * (next.lat - curr.lat);
    }

    // Conversion factor: 1 sq degree = 111.32 sq km (approximately)
    const sqKmArea = (Math.abs(area) / 2) * 111.32 * 111.32;
    
    return sqKmArea;
  }


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
      const documentCount = dataCollectionSnapshot.size
      const dataDocumentId = `PlotNO_${documentCount}`;
 
      const getcenter = ((Coordinates)=> {

        var centerlat = 0
        var centerlng = 0 
        var CDL = Coordinates.length
        for (let i = 0; i < CDL ; i++) {

          centerlat = centerlat + Coordinates[i].lat
          centerlng = centerlng + Coordinates[i].lng
        }

        centerlat = centerlat/CDL
        centerlng = centerlng/CDL 

        return [centerlat,centerlng]

      })
     

      const PlotCollection = {
        Plot_Number : documentCount,
        Plotname: Plotname,
        Plot_Credential: 'NULL',
        Session_Created: `${day}/${month}/${year}`,
        Session_Expiry: `${day}/${month}+3/${year}`,
        

        Plotpolygon: polygonCoordinates,
        PlotCenter: getcenter(polygonCoordinates),
        Area: calculatePolygonArea(polygonCoordinates).toFixed(2),
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
      <div className="centering-wrapper1">
      <div className="section1 text-center">
        <h1 class="primary-header4">Plot Registration</h1>
        
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
              <label htmlFor="Plotname"class="info-plot">Plotname: </label>
              <input
                type="text"
                id="Plotname"
                value={Plotname}
                class="form-style2"
                onChange={(e) => regPlotname(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="PlotAge"class="info-plot">Plot Age: </label>
              <input
                type="text"
                id="PlotAge"
                value={PlotAge}
                class="form-style2"
                onChange={(e) => regPlotAge(e.target.value)}
                required
              />
            </div>

            <div className="MapBoxContainerForDraw">
              <h1>Check your rubber plot production</h1>
              <iframe
                src="/mapdrawing.html"
                width="80%"
                height="400px"
                frameBorder="0"
                title="Google Map"
              ></iframe>
              <div>
                <h2>Polygon Coordinates:</h2>
                <textarea
                  rows={20}
                  cols={60}
                  readOnly
                  value={JSON.stringify(polygonCoordinates)}
                />
                <h2>Polygon Area:</h2>
                <p>{calculatePolygonArea(polygonCoordinates).toFixed(2)} sq km</p>
              </div>
            </div>

            <div>
       
            </div>
            <p>{ErrMSG}</p>
            <button type="submit"class="submit-button">ENTER</button>
          </form>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default PlotRegister;
