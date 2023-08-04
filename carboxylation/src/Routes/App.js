

import { Outlet, Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';
import './css/App.css';
function App() {

  const backgroundStyle = {
    backgroundImage: `url(${Title})`, // Set the background image
    backgroundSize: 'cover', // Make sure the image covers the entire background
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent repeating the image
    minHeight: '100vh', // Set a minimum height to cover the entire viewport
  };

  
  return (
    <div className="App">

    <div className="static-bar">

        <div className="left-content">
        <a href="/">
            <img src={Title} alt="Title" /> {/* Use {Title} for the image source */}
          </a>
        </div>

        <div className="right-content">
       
          <Link to="/Login">
            <button>Login</button>
          </Link>
 
          <button>Register</button>
        </div>

      </div>

      <header className="App-header">

        <p>
        Main Page
        </p>

      </header>
    </div>
  );
}

export default App;