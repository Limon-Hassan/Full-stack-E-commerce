import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5990',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const ProtectedRoute = () => {
  const navigate = useNavigate();
  let [isvaild, setIsvaild] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance
          .get('http://localhost:5990/api/v1/auth/user')
          .then(Response => {
            if (Response.statusText === 'OK') {
              setIsvaild(true);
            } 
          });
      } catch (error) {
        console.log('error hoise :' + error);
        localStorage.removeItem('userId');
        navigate('/sign-in');
      }
    };
    checkAuth();
  }, []);

  return isvaild ? <Outlet /> : <div>Wait....</div>;
};

export default ProtectedRoute;
