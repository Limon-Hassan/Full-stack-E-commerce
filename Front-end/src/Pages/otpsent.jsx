import React, { useEffect, useRef, useState } from 'react';
import { Input, Typography, Button } from '@material-tailwind/react';
import Container from '../Container/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const OtpSent = () => {
  const user = useSelector(state => state.auth.user);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(countdown);
          setIsResendEnabled(true);
          setIsExpired(true);
          setOtp(Array(4).fill(''));
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === 'Backspace' && !event.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async otpCode => {
    if (isExpired) return;

    try {
      const response = await axios.post(
        'http://localhost:5990/api/v1/auth/otp-verify',
        { email: user.email, otp: otpCode }
      );

      if (response.data === 'OTP verified successfully!') {
        navigate('/sign-in');
      } else {
        alert('Invalid OTP, try again.');
        setOtp(Array(4).fill(''));
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (isExpired && !isResendEnabled) return;

    setIsResendEnabled(false); 
    setTimer(60); 
    setIsExpired(false); 

    try {
      const response = await axios.post(
        'http://localhost:5990/api/v1/auth/otp-reset',
        {
          email: user.email,
        }
      );

      if (response.data === 'OTP reset successful') {
        alert('New OTP sent!');
      } else {
        alert('Failed to resend OTP. Try again later.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP. Try again later.');
    }
  };

  return (
    <section className="mt-[150px] mb-[150px]">
      <Container>
        <div className="bg-white shadow-xl flex flex-col items-center justify-center border border-black.50 rounded-xl shadow-black/20 mx-auto h-[350px] p-6">
          <Typography
            variant="small"
            color="blue-gray"
            className="flex items-center justify-center gap-1 text-center font-medium"
          >
            Enter the 4-digit OTP sent to
            <span className="font-bold">{user.email}</span>
          </Typography>

          <div className="my-4 flex items-center justify-center gap-2">
            {otp.map((digit, index) => (
              <React.Fragment key={index}>
                <Input
                  type="text"
                  maxLength={1}
                  className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 "
                  value={digit}
                  containerProps={{
                    className: '!min-w-0 !w-10 !shrink-0 !outline-none',
                  }}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleBackspace(e, index)}
                  inputRef={el => (inputRefs.current[index] = el)}
                />
              </React.Fragment>
            ))}
          </div>

          {isExpired && (
            <Typography
              variant="small"
              className="text-center text-red-500 mb-3"
            >
              OTP Expired. Please request a new one.
            </Typography>
          )}

          <Typography
            variant="small"
            className="text-center font-normal text-blue-gray-500"
          >
            {isResendEnabled ? (
              <span
                className="font-bold cursor-pointer text-blue-500"
                onClick={handleResendOtp}
              >
                Resend OTP
              </span>
            ) : (
              `Resend OTP in ${timer}s`
            )}
          </Typography>
        </div>
      </Container>
    </section>
  );
};

export default OtpSent;
