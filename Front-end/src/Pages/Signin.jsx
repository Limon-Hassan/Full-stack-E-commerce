import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../action/authAction';
import Container from '../Container/Container';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5990',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.email;
    const passwordInput = form.password;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    emailInput.setCustomValidity('');
    passwordInput.setCustomValidity('');

    try {
      const response = await axiosInstance.post(
        'http://localhost:5990/api/v1/auth/login',
        loginInputs
      );
      localStorage.setItem('userId', response.data.user._id);
      dispatch(setUser({ user: response.data.user }));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response && error.response.status === 401) {
        const backendMessage =
          error.response.data?.msg || 'Unauthorized access';
        passwordInput.setCustomValidity(backendMessage);
        passwordInput.reportValidity();
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <Container>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-[1000px] gap-[40px] flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-blue-50 flex items-center justify-center p-6">
            <img src="/bennerpage.png" alt="Shopping" className="w-full" />
          </div>

          <div className="md:w-1/2 p-6">
            <h2 className="text-[30px] font-Inter_FONT font-medium leading-9 text-[#000000] mb-[24px]">
              Welcome Back!
            </h2>
            <p className="text-[16px] font-Poppipns_FONT font-normal text-[#000000] leading-6 mb-[48px]">
              Enter your details below
            </p>

            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="relative w-[400px] mb-[30px]">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={loginInputs.email}
                  onChange={handleChange}
                  className="peer border-b bg-transparent text-[16px] font-Poppipns_FONT font-normal outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
                  required
                />
                <span
                  className={`absolute left-5 ${
                    loginInputs.email ? '-top-3 scale-90' : 'top-3.5'
                  } peer-focus:-top-3 peer-focus:bg-white text-[16px] font-Poppipns_FONT font-normal peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary text-[#777777] peer-focus:px-1 transition-all duration-300`}
                >
                  Your Email
                </span>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="relative w-[400px] mb-[30px]">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={loginInputs.password}
                  onChange={handleChange}
                  className="peer border-b bg-transparent text-[16px] font-Poppipns_FONT font-normal outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
                  required
                />
                <span
                  className={`absolute left-5 ${
                    loginInputs.password ? '-top-3 scale-90' : 'top-3.5'
                  } peer-focus:-top-3 peer-focus:bg-white text-[16px] font-Poppipns_FONT font-normal peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary text-[#777777] peer-focus:px-1 transition-all duration-300`}
                >
                  Your Password
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center text-gray-600 text-sm">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-blue-500 text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
              >
                Log In
              </button>

              <div className="flex items-center my-4">
                <hr className="w-full border-gray-300" />
                <span className="px-3 text-gray-400">or</span>
                <hr className="w-full border-gray-300" />
              </div>

              <button className="w-full border text-[16px] font-Poppipns_FONT font-normal text-[#000000] py-3 flex items-center justify-center rounded-lg hover:bg-gray-100">
                <img
                  src="/Group 1 copy.png"
                  alt="Google Logo"
                  className="w-5 mr-2"
                />
                Log in with Google
              </button>
            </form>

            <p className="text-gray-600 text-center mt-4">
              Don't have an account?
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Signin;
