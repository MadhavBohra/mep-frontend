'use client';

import React from 'react';
import Link from 'next/link';
import './Header.css';
import { useState, useEffect } from 'react';

import LogInForm from '../LogIn/LogInForm';

import { getToken } from '../../services/auth';






const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);


  // using Hooks
  // showLogin is the variable that holds the current state value
  // setShowLogin is the function that updates value of showLogin
  const [showLogin, setShowLogin] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsCheckingAuth(false); // Allow rendering if token exists
      setIsAuthenticated(true);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // when Login Button is clicked
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  // when CloseLogin function is called
  const handleCloseLogin = () => {
    setShowLogin(false);
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
          {!isCheckingAuth && (
            !isAuthenticated ? (
              <>
                <button className='signup'>SignUp</button>
                <button className='login' onClick={handleLoginClick}>Login</button>
              </>
            ) : (
              <>
                <img className="bell" src="/bell.png" alt="Notifications" />
                <Link href='/UserDashboard'><img className="avatar" src="/avataricon.png" alt="User Avatar" /></Link>
              </>
            )
          )}



        </div>
      </header>
      {showLogin && <LogInForm onClose={handleCloseLogin} />}
    </div>



  );
};

export default Header;
