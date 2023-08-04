import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './Routes/App';
import Err from './Routes/Err'
import Login from './Routes/Login';
import Register from './Routes/Register';
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Err />,
    element:  <App/>,
  },

  {
    path: "/Login",
    element: <Login/>,
  },

  {
    path: "/Register",
    element: <Register/>,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


/*
// import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/