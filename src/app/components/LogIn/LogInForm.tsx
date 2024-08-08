'use client';


import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import './LogInForm.css'; // Assuming you have a CSS module for styling





// first line not understood
const LogInForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);
  
  const formContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      formContainerRef.current &&
      !formContainerRef.current.contains(event.target as Node) &&
      imageContainerRef.current &&
      !imageContainerRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    // For example, you could send a request to your server to authenticate the user
    if (username === 'test' && password === 'password') {
      setErrorMessage('');
      alert('Login successful');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const validateForm = () => {
    setFormValid(username.length > 0 && password.length > 0);
  };



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

  return (
    <div className='loginContainer' onClick={handleClickOutside}>
      <div className='formContainer'  ref={formContainerRef}>
        <img src='/logo.png' alt="Logo" className='logo' />
        <h2>Log In</h2>
        <h4>Don't have an account? <Link href="/SignUp"><span className='signUp'>Sign Up</span></Link></h4>
        <div className='socialsContainer'>
          <button type="button" className='googleBtn'>
              <img src='/logos/google.svg' alt='google-icon' className='icon'></img> Log in with Google
          </button>
          <button type="button" className='facebookBtn'>
          <img src='/logos/facebook.svg' alt='facebook-icon' className='icon'></img> Log in with Facebook
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
          <label>Password <div> <img
              src='/eye.png'
              alt={showPassword ? 'Hide' : 'Show'}
              className='eyeIcon'
              onClick={toggleShowPassword}
            ></img>Hide</div></label>
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
          <Link href="/forgot-password"><span className= 'forgotPassword'>Forgot Password?</span></Link>
          <button type="submit" className='loginBtn' disabled={!formValid}>Log in</button>
          
        </form>
      </div>
      <div className='imageContainer' ref={imageContainerRef}>
        <img src='/GreenBGRight.png' alt="Side" />
      </div>
    </div>
  );
};

export default LogInForm;