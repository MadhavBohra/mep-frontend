'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { googleSignIn, facebookSignIn } from '../../services/firebase'; // Firebase login services
import { UserCredential } from 'firebase/auth';
import styles from './LogInForm.module.css';
import { setToken } from '@/app/services/auth';
import InstagramProvider from "next-auth/providers/instagram";
// import InstaLogIn from '../InstaLogIn';




const LogInForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);

  const formContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


    const handleInstagramLogin = () => {
        const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=1256357732041392&redirect_uri=http://localhost:3000/UserDashboard&scope=user_profile&response_type=code`;
    
        const width = 500;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        const popup = window.open(
          instagramAuthUrl,
          'instagramLoginPopup',
          `width=${width},height=${height},top=${top},left=${left}`
        );
        
        // Optional: You can monitor if the popup closes to handle next steps
if (popup) {
  const popupInterval = setInterval(() => {
    if (popup.closed) {
      clearInterval(popupInterval);
      console.log('Instagram login popup closed');
      // Handle any post-popup actions here, e.g., refresh authentication status
    }
  }, 1000);
} else {
  console.error('Failed to open popup. It might have been blocked by the browser.');
  // You can provide a fallback mechanism or alert the user here
}
}


  // Close the form if clicking outside the modal
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

  // Form validation
  const validateForm = (username: string, password: string) => {
    setFormValid(username.length > 0 && password.length > 0);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    validateForm(e.target.value, password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateForm(username, e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Submit logic for email/password login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // API call for email/password login
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to log in');
      }

      setToken(data.accessToken, data.refreshToken);

      console.log('Login successful:', data);
      router.push('/UserDashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during login');
    }
  };

  // Handle Google, Facebook, Instagram login
  const handleSocialLogin = async (loginMethod: () => Promise<UserCredential>) => {
    try {
      const result = await loginMethod();
      const idToken = await result.user.getIdToken(); // Get Firebase ID token

      console.log(result);
      console.log(idToken);

      // Send token to the backend for user authentication
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: idToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to log in via social login');
      }

      setToken(data.accessToken, data.refreshToken);

      console.log('Social login successful:', data);
      router.push('/UserDashboard');
    } catch (error) {
      console.error('Social login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during sign in');
    }
  };

  return (
    <div
      className={styles.loginContainer}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.formContainer} ref={formContainerRef}>
        <img src='/logo.png' alt="Logo" className={styles.logo} />
        <h2>Log In</h2>
        <h4>
          Don't have an account?{' '}
          <Link href="/SignUp">
            <span className={styles.signUp}>Sign Up</span>
          </Link>
        </h4>
        <div className={styles.socialsContainer}>
          <button
            type="button"
            className={styles.googleBtn}
            onClick={() => handleSocialLogin(googleSignIn)}
          >
            <img src='/logos/google.svg' alt='google-icon' className={styles.icon} /> Log in with Google
          </button>
          <button
            type="button"
            className={styles.facebookBtn}
            onClick={() => handleSocialLogin(facebookSignIn)}
          >
            <img src='/logos/facebook.svg' alt='facebook-icon' className={styles.icon} /> Log in with Facebook
          </button>
          <button
            type="button"
            className={styles.instagramBtn} // Add Instagram button style
            onClick={() => handleInstagramLogin()}
          >
            <img src='/logos/instagram.svg' alt='instagram-icon' className={styles.icon} /> Log in with Instagram
          </button>
        </div>
        <div className={styles.orSeparator}>
          <span className={styles.line}></span>
          <span className={styles.orText}>OR</span>
          <span className={styles.line}></span>
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label htmlFor="username">Username or Email</label>
          <input
            id="username"
            placeholder='Username or Email'
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label htmlFor="password">
            Password
            <button type="button" className={styles.eyeIcon} onClick={toggleShowPassword}>
              <img
                src='/eye.png'
                alt={showPassword ? 'Hide password' : 'Show password'}
              />
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </label>
          <div className={styles.passwordInput}>
            <input
              id="password"
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <Link href="/forgot-password">
            <span className={styles.forgotPassword}>Forgot Password?</span>
          </Link>
          <button type="submit" className={styles.loginBtn} disabled={!formValid}>
            Log in
          </button>
        </form>
      </div>
      <div className={styles.imageContainer} ref={imageContainerRef}>
        <img src='/GreenBGRight.png' alt="Decorative side image" />
      </div>
    </div>
  );
};

export default LogInForm;
