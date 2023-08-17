import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {
  return function WithAuthenticationWrapper(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('token') !== null;

      if (!isAuthenticated) {
        navigate('/login'); // Redirect to login page if not authenticated
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;
