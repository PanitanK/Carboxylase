import { Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';
import './css/App.css';
import Mapframe from "./Mapframe";
import Credit from './image/logo/Credit.png'
import { useEffect } from 'react';
function App() {
  
   useEffect(() => {
    window.scrollTo(0, 60); // Scroll to the top of the page
    // ... other useEffect code ...
  }, []);

  return (
    <div className="App" >
      <div className="static-bar">
        <div className="left-content">
          <a href="/">
            <img src={Title} alt="Title" /> {/* Use {Title} for the image source */}
          </a>
        </div>

      <div className="right-content">
        
        <Link to="/Login">
          <button class="btn1">Login</button>
        </Link>

        <Link to="/Register">
          <button class="btn2">Register</button>
        </Link>

        </div>
      </div>

      <header className="App-header">
       <h1 className="primary-header" style={{ marginTop:"150px" , color:'black',transform: "scale(1.2)"}}>
        
        Carboxylation <br></br><br></br>Your Carbon Credit Validation Solution</h1>

      <img  style={{ height:'500px' ,marginTop:"50px"
      
    }}
            src={Credit}
            alt="Credit">
            
            </img>

        <div style={{ transform: "scale(0.8)" }}  >
        <Mapframe />
        </div>

        <Link to="/Register">
          <button class="btn2" style={{ fontSize :'20px' ,paddingTop: '20px', paddingBottom: '20px' , paddingLeft: '40px' , paddingRight: '40px' }}>Join Us</button>
        </Link>
        <div className="footer">
          
          
        </div>
      </header>
    
    </div>
  );
}

export default App;