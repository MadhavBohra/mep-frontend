'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "./Header.module.css";

import LogInForm from '../LogIn/LogInForm';
import SignUpForm from '@/app/SignUp/SignUpForm';
import { clearTokens, getToken } from '../../services/auth';
import { signUp } from '../../services/api';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
    setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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

  const handleToggle = () => setIsOpen(!isOpen);

  const handleProfile = () => {
    window.location.href = '/UserProfile';
    setIsOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/LandingPage';
    clearTokens();
    setIsOpen(false);
  };

  // Toggle mobile menu
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={styles.headerContainer}>
      <header className={`${styles.header} ${isScrolled ? `${styles.scrolled}` : ''}`}>
        <div className={styles.hamburger} onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.logo}>
          <Link href='/LandingPage'><img src="/logo.png" alt="Logo" /></Link>
        </div>
        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.show : ''}`}>
          <Link href='/LandingPage'>Home</Link>
          <span>/</span>
          <Link href="/AboutUs">About Us</Link>
          <span>/</span>
          <Link href="/Blogs">Blogs</Link>
          <span>/</span>
          <Link href="/FAQs">FAQs</Link>
          <span>/</span>
          <Link href="/ContactUs">Contact</Link>
          {isAuthenticated ? (
            <div className={styles.loggedInBtn}>
              <Link href="/UserProfile">Profile</Link>
              <Link href='/LandingPage' onClick={handleLogout}>Log Out</Link>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <button className={styles.signup} onClick={handleSignUpClick}>Sign Up</button>
              <button className={styles.login} onClick={handleLoginClick}>Log In</button>
            </div>
          )}
        </nav>
        <div className={styles.icons}>
          {!isCheckingAuth && isAuthenticated && (
            <>
              <img className={styles.bell} src="/Bell.png" alt="Notifications" />
              <img className={styles.avatar} src="/avataricon.png" alt="User Avatar" onClick={handleToggle} />
              {isOpen && (
                <div className={styles.dropdownMenu}>
                  <button onClick={handleProfile} className={styles.dropdownItem}>
                    Profile
                  </button>
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    Log Out
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </header>
      {showLogin && <LogInForm onClose={handleCloseLogin} />}
      {showSignUp && <SignUpForm onClose={handleCloseSignUp} onSignUpComplete={handleSignUpComplete} />}
    </div>
  );
};

export default Header;
