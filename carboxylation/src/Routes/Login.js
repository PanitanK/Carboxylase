import './css/App.css';
import { Outlet, Link } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';

function Login() {
  return (
    
    <div className='App-header'>
      <div className="static-bar">

<div className="left-content">
<a href="/">
    <img src={Title} alt="Title" /> {/* Use {Title} for the image source */}
  </a>
</div>



</div>
      <h2>Login Page</h2>
      {/* Add your login form or content here */}
    </div>
  );
}

export default Login;