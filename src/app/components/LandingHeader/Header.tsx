'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Header.css';

import LogInForm from '../LogIn/LogInForm';
import SignUpForm from '@/app/SignUp/SignUpForm';
import { clearTokens, getToken } from '../../services/auth';
import { signUp } from '../../services/api'; // Import the API utility function

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token); // Simplified to directly set the state based on token presence
    setIsCheckingAuth(false);
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
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
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
        window.location.href = '/UserDashboard';
      } else {
        console.error('Sign up failed: No user ID returned');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };



// Drop Downs :
const handleToggle = () => setIsOpen(!isOpen);

  const handleProfile = () => {
    window.location.href = '/UserProfile'; // Navigate to the profile page
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    window.location.href = '/LandingPage';
    clearTokens();
    setIsOpen(false);
  };

  return (
    <div className='header-container'>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <Link href='/LandingPage'><img src="/logo.png" alt="Logo" /></Link>
        </div>
        <nav className="nav-links">
          <Link href='/LandingPage'>Home</Link>
          <span>/</span>
          <Link href="/AboutUs">About Us</Link>
          <span>/</span>
          <Link href="/Blogs">Blogs</Link>
          <span>/</span>
          <Link href="/FAQs">FAQs</Link>
          <span>/</span>
          <Link href="/ContactUs">Contact</Link>
          <span>/</span>
          <img className="icon" src="/search.png" alt="Search" style={{width:"24px"}}/>
        </nav>
        <div className="icons">
          {!isCheckingAuth && (
            !isAuthenticated ? (
              <>
                <button className='signup' onClick={handleSignUpClick}>Sign Up</button>
                <button className='login' onClick={handleLoginClick}>Log In</button>
              </>
            ) : (
              <>
                <img className="bell" src="/Bell.png" alt="Notifications" />
                <img className="avatar" src="/avataricon.png" alt="User Avatar" onClick={handleToggle}/>
                {isOpen && (
                  <div className="dropdownMenu">
                    <button onClick={handleProfile} className="dropdownItem">
                      Profile
                    </button>
                    <button onClick={handleLogout} className="dropdownItem">
                      Log Out
                    </button>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </header>
      {showLogin && <LogInForm onClose={handleCloseLogin} />}
      {showSignUp && <SignUpForm onClose={handleCloseSignUp} onSignUpComplete={handleSignUpComplete} />}
    </div>
  );
};

export default Header;
