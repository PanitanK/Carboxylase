import React from 'react';
import { Navigate } from 'react-router-dom';

function Protected({ isSignedIn, userUID, children }) {
  
  if (!isSignedIn) {
    // Redirect logic if user is not signed in
    return <Navigate to="/Login" />;
  }

  // Check if userUID matches the allowed UID (replace with your logic)
  

  if (userUID != null) {
    // Redirect if user UID is not allowed
    return <Navigate to="/Login" />;
  }

  // User is signed in and has the allowed UID, render the children
  return children;
}

export default Protected;
