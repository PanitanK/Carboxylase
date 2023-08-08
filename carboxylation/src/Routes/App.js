import { Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';
import './css/App.css';



function App() {

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

        <Link to="/Register">
          <button>Register</button>
        </Link>

        </div>
      </div>

      <header className="App-header">
        <p>Main Page</p>
      </header>

    </div>
  );
}

export default App;