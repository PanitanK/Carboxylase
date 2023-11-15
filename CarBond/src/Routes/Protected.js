import React, { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function Protected({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userUID = location.state.userUID;

  useEffect(() => {
    if (userUID == null) {
      navigate('/Login');
    } else {
      navigate('/Home', { state: { userUID } });
    }
  }, [navigate, userUID]);

  // Render the children only if the user is signed in
  if (userUID != null) {
    return <>{children}</>;
  }

  // User is not signed in, already navigated
  return null;
}

export default Protected;
