'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './LogInForm.css';
import { clearTokens, setToken } from '../../services/auth';

const LogInForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);

  const formContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // For navigation

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (
        formContainerRef.current &&
        !formContainerRef.current.contains(event.target as Node) &&
        imageContainerRef.current &&
        !imageContainerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleGlobalClick);
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [onClose]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    validateForm();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateForm();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    setFormValid(username.length > 0 && password.length > 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      clearTokens();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        throw new Error(data.message || 'Invalid email or password');
      }

      const authToken = data.accessToken; // or whatever the key is in your response
      const refreshToken = data.refreshToken; // or whatever the key is in your response
      console.log(authToken);
      setToken(authToken,refreshToken);
  
      // Check if user has a profile
      const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (profileResponse.ok) {
        // User has a profile, redirect to dashboard
        router.push('/UserDashboard');
      } else {
        // User does not have a profile, redirect to profile creation
        router.push('/UserProfile');
        console.log(response);
        console.log(data);
      }
      // } else {
      //   throw new Error('Failed to verify user profile');
      // }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='loginContainer' onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className='formContainer' ref={formContainerRef}>
        <img src='/logo.png' alt="Logo" className='logo' />
        <h2>Log In</h2>
        <h4>
          Don't have an account?{' '}
          <Link href="/SignUp">
            <span className='signUp'>Sign Up</span>
          </Link>
        </h4>
        <div className='socialsContainer'>
          <button type="button" className='googleBtn'>
            <img src='/logos/google.svg' alt='google-icon' className='icon' /> Log in with Google
          </button>
          <button type="button" className='facebookBtn'>
            <img src='/logos/facebook.svg' alt='facebook-icon' className='icon' /> Log in with Facebook
          </button>
        </div>
        <div className='orSeparator'>
          <span className='line'></span>
          <span className='orText'>OR</span>
          <span className='line'></span>
        </div>
        <form onSubmit={handleSubmit} className='loginForm'>
          <label>Username or Email</label>
          <input
            placeholder='Username'
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label>
            Password
            <div>
              <img
                src='/eye.png'
                alt={showPassword ? 'Hide' : 'Show'}
                className='eyeIcon'
                onClick={toggleShowPassword}
              />
              {showPassword ? 'Hide' : 'Show'}
            </div>
          </label>
          <div className='passwordInput'>
            <input
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
          <Link href="/forgot-password">
            <span className='forgotPassword'>Forgot Password?</span>
          </Link>
          <button type="submit" className='loginBtn' disabled={!formValid}>
            Log in
          </button>
        </form>
      </div>
      <div className='imageContainer' ref={imageContainerRef}>
        <img src='/GreenBGRight.png' alt="Side" />
      </div>
    </div>
  );
};

export default LogInForm;
