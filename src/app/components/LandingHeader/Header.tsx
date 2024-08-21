'use client';

<<<<<<< HEAD
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

=======
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
>>>>>>> 5bde4c7 (LogIn, SignUp and Headers Button changes)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsAuthenticated(false);
    } else {
<<<<<<< HEAD
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
=======
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

>>>>>>> 5bde4c7 (LogIn, SignUp and Headers Button changes)
  const handleCloseLogin = () => {
    setShowLogin(false);
  };

<<<<<<< HEAD
=======
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

>>>>>>> 5bde4c7 (LogIn, SignUp and Headers Button changes)
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
<<<<<<< HEAD
                <button className='signup'>SignUp</button>
                <button className='login' onClick={handleLoginClick}>Login</button>
=======
                <button className='signup' onClick={handleSignUpClick}>Sign Up</button>
                <button className='login' onClick={handleLoginClick}>Log In</button>
>>>>>>> 5bde4c7 (LogIn, SignUp and Headers Button changes)
              </>
            ) : (
              <>
                <img className="bell" src="/bell.png" alt="Notifications" />
                <Link href='/UserDashboard'><img className="avatar" src="/avataricon.png" alt="User Avatar" /></Link>
              </>
            )
          )}
<<<<<<< HEAD



        </div>
      </header>
      {showLogin && <LogInForm onClose={handleCloseLogin} />}
    </div>



=======
        </div>
      </header>
      {showLogin && <LogInForm onClose={handleCloseLogin} />}
      {showSignUp && <SignUpForm onClose={handleCloseSignUp} onSignUpComplete={handleSignUpComplete} />}

    </div>
>>>>>>> 5bde4c7 (LogIn, SignUp and Headers Button changes)
  );
};

export default Header;
