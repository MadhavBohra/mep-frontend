'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Header.css';

import LogInForm from '../LogIn/LogInForm';
import SignUpForm from '@/app/SignUp/SignUpForm';
import { getToken } from '../../services/auth';
import { signUp } from '../../services/api'; // Import the API utility function

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false); // Moved out of condition to ensure it's set in both cases
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false); // Close the signup form if it's open
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false); // Close the login form if it's open
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  const handleSignUpComplete = async (userData: { email: string; username: string; password: string }) => {
    try {
      const result = await signUp(userData);
      if (result && result.id) {
        // Redirect to the dashboard page
        window.location.href = '/UserDashboard';
      } else {
        // Handle error case if `result.id` is not available
        console.error('Sign up failed: No user ID returned');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div className='header-container'>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <a href='/LandingPage'><img src="/logo.png" alt="Logo" /></a>
        </div>
        <nav className="nav-links">
          <a href='/LandingPage'>Home</a>
          <span>/</span>
          <a href="/AboutUs">About Us</a>
          <span>/</span>
          <a href="/Blogs">Blogs</a>
          <span>/</span>
          <a href="/FAQs">FAQs</a>
          <span>/</span>
          <a href="/ContactUs">Contact</a>
          <span>/</span>
          <img className="icon" src="/search.png" alt="Search" />
        </nav>
        <div className="icons">
                <button className='signup' onClick={handleSignUpClick}>Sign Up</button>
                <button className='login' onClick={handleLoginClick}>Log In</button>
                <img className="bell" src="/bell.png" alt="Notifications" />
                <Link href='/UserDashboard'><img className="avatar" src="/avataricon.png" alt="User Avatar" /></Link>
        </div>
      </header>
      <LogInForm onClose={handleCloseLogin} />
      <SignUpForm onClose={handleCloseSignUp} onSignUpComplete={handleSignUpComplete} />

    </div>
  );
};

export default Header;
