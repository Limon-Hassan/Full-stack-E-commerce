import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '../Container/Container';
import { useDispatch } from 'react-redux';
import { setUser } from '../action/authAction';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5990/api/v1/auth/regisation',
        formData
      );
      localStorage.setItem('authuser', JSON.stringify(response.data.user));
      dispatch(setUser(response.data.user));

      navigate('/otpsent');
    } catch (err) {
      console.error('Full error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <Container>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-blue-50 flex items-center justify-center p-6">
            <img src="/bennerpage.png" alt="Shopping" className="w-full" />
          </div>

          <div className="md:w-1/2 p-6">
            <h2 className="text-[30px] font-medium text-[#000000] mb-[24px]">
              Create an account
            </h2>
            <p className="text-[16px] text-[#000000] mb-[48px]">
              Enter your details below
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border text-[16px] mb-[30px] rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email or Phone Number"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border text-[16px] mb-[30px] rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border text-[16px] mb-[30px] rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[12px] right-[10px] flex items-center text-lg text-gray-500"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-[18px] bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="flex items-center my-4">
                <hr className="w-full border-gray-300" />
                <span className="px-3 text-gray-400">or</span>
                <hr className="w-full border-gray-300" />
              </div>

              <button className="w-full border text-[16px] text-[#000000] py-3 flex items-center justify-center rounded-lg hover:bg-gray-100">
                <img
                  src="/Group 1 copy.png"
                  alt="Google Logo"
                  className="w-5 mr-2"
                />
                Sign up with Google
              </button>
            </form>

            <p className="text-gray-600 text-center mt-4">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Signup;
