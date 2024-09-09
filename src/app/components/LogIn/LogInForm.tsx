'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { googleSignIn, facebookSignIn } from '../../services/firebase';
import { UserCredential } from 'firebase/auth';
import styles from './LogInForm.module.css';

const LogInForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);

  const formContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    validateForm(e.target.value, password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateForm(username, e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (username: string, password: string) => {
    setFormValid(username.length > 0 && password.length > 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle your custom login logic here
  };

  const handleSocialLogin = async (loginMethod: () => Promise<UserCredential>) => {
    try {
      const result = await loginMethod();
      console.log('User signed in:', result.user);
      router.push('/UserDashboard');
    } catch (error) {
      console.log(error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during sign in');
    }
  };

  return (
    <div className={styles.loginContainer} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
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
          <button type="button" className={styles.googleBtn} onClick={() => handleSocialLogin(googleSignIn)}>
            <img src='/logos/google.svg' alt='google-icon' className={styles.icon} /> Log in with Google
          </button>
          <button type="button" className={styles.facebookBtn} onClick={() => handleSocialLogin(facebookSignIn)}>
            <img src='/logos/facebook.svg' alt='facebook-icon' className={styles.icon} /> Log in with Facebook
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
            placeholder='Username'
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