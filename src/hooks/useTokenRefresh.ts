import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const useTokenRefresh = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if (tokenExpiration) {
        const expirationTime = new Date(tokenExpiration).getTime();
        const currentTime = new Date().getTime();

        // If the token is about to expire in less than 5 minutes, refresh it (mocking here)
        if (expirationTime - currentTime < 5 * 60 * 1000) {
          console.log('Refreshing token...');
          // Mock refresh process (or call your refresh token API here)
          localStorage.setItem('tokenExpiration', new Date(Date.now() + 15 * 60 * 1000).toString()); // Extending expiration by 15 minutes
        }
      }
    }, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [logout]);
};

export default useTokenRefresh;
