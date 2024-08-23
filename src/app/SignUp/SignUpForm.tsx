'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './SignUpForm.css';
import { setToken } from '../services/auth';

type SignUpData = {
  email: string;
  username: string;
  password: string;
};

const SignUpForm: React.FC<{ onClose?: () => void; onSignUpComplete?: (data: SignUpData) => void }> = ({ onClose, onSignUpComplete }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setFormValid(email.length > 0 && username.length > 0 && password.length > 0);
  }, [email, username, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error(`Sign up failed: ${response.statusText}`);
      }

      const data = await response.json();
      const authToken = data.accessToken; // or whatever the key is in your response
      const refreshToken = data.refreshToken; // or whatever the key is in your response
      console.log(authToken);
      setToken(authToken,refreshToken);

      if (onSignUpComplete) onSignUpComplete(data);

      // Redirect to UserDashboard
      router.push('/UserDashboard');

      if (onClose) onClose();
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div
      className="signup-container"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="formContainer">
        <div className="container">
          <div>
            <h1>Welcome to MyEasyPharma</h1>
            <p>Already have an account? <Link href="/LogIn"><span>Log in</span></Link></p>
          </div>
          <img src='/logo.png' alt="Logo" className='logo' />
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label>
            Password
            <div className="password-toggle">
              <img
                src='/eye.png'
                alt={showPassword ? 'Hide' : 'Show'}
                className='eyeIcon'
                onClick={toggleShowPassword}
              />
              <span onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
            </div>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className="password-criteria">
            <li>Use 8 or more characters</li>
            <li>One Uppercase character</li>
            <li>One lowercase character</li>
            <li>One special character</li>
            <li>One number</li>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="marketing"/>
            <p>I want to receive emails about the product, feature updates, events, and marketing promotions</p>
          </div>

          <div className="terms">
            <p>By creating an account, you agree to the <Link href="#"><span>Terms of use</span></Link> and <Link href="#"><span>Privacy Policy</span></Link>.</p>
          </div>

          <button type="submit" className="signup-btn" disabled={!formValid}>Create an account</button>
        </form>
      </div>
      <div className="imageContainer">
        <img src="/GreenBGRight.png" alt="Side Background" />
      </div>
    </div>
  );
};

export default SignUpForm;
