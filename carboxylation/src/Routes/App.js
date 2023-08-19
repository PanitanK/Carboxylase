import { Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';
import './css/App.css';
import Mapframe from "./Mapframe";


function App() {

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
        <p>Main Page</p>
        <Mapframe />
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