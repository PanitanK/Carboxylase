import './css/App.css';
import Title from './image/logo/CBX_Transparent.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Submitted username:', email);
    console.log('Submitted password:', password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const _user = userCredential.user;
      console.log(userCredential)
      console.log(_user.uid)
      setErrMsg(null);
      navigate('/Protected', { state: { userUID: _user.uid } });

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
          <a href="/">
            <img src={Title} alt="Title" />
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

      <div className="App-header"> 
      <div className="centering-wrapper">
      <div className="section1 text-center">
      <div className="primary-header"><h1>Login page</h1></div>
        <Link to="/Register" class="link2">Don't have an account?</Link>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="Email" class="label">Email:</label>
            <input
              type="text"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" class="label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p>{errMsg}</p>
          <Link to="/ForgotPassword" class="link2">Forgot Password? </Link>          
        <div>
        <button type="submit"class="submit-button">Login</button>
        </div>
        </form>
        
      </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
