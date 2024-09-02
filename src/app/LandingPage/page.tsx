'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./LandingPage.module.css";
import LandingHeader from "../components/LandingHeader/Header";
import LogInForm from "../components/LogIn/LogInForm";
import { useRouter } from 'next/navigation';
import { getToken } from '../services/auth';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace('/UserDashboard'); // Redirect to the dashboard if the token exists
    } else {
      setIsCheckingAuth(false); // Allow rendering the landing page if no token
    }
  }, [router]);

  if (isCheckingAuth) {
    return null; // Prevent rendering anything while checking the token
  }





  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className={styles.background}>
      <LandingHeader />
      <div className={styles.container}>
        <div>
          <p className={styles.heading}>AI Curated corporate wellness program</p>
          <p className={styles.subHeading}>MyEasyPharma</p>
          <button className={styles.started_btn} onClick={handleLoginClick}>Get started for free</button>
          <Link href='/OurServices'><button className={styles.services_btn}>&#x25BC; Our Services</button></Link>
        </div>
        <div style={{alignItems:"right"}}>
          <img src="/LandingPage/hero_image.png"></img>
        </div>
      </div>
      {showLogin && <LogInForm onClose={handleCloseLogin} />}
    </div>
  );
}

export default LandingPage;