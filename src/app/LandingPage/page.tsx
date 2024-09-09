'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./LandingPage.module.css";
import LandingHeader from "../components/LandingHeader/Header";
import LogInForm from "../components/LogIn/LogInForm";
import { useRouter } from 'next/navigation';
import { getToken } from '../services/auth';
import OurServices from "../OurServices/page";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);

  // Check if the token is valid or expired
  useEffect(() => {
    const token = getToken();
    // const token = "1234";
    if (token) {
      router.replace('/UserDashboard');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  // useEffect(() => {
  //   let scrollTimeout: NodeJS.Timeout | null = null;

  //   const handleScroll = () => {
  //     if (scrollTimeout) {
  //       clearTimeout(scrollTimeout);
  //     }
  //     scrollTimeout = setTimeout(() => {
  //       snapScroll();
  //     }, 1); // Adjust delay for faster or slower snapping
  //   };

    // const snapScroll = () => {
    //   if (!landingRef.current || !servicesRef.current) return;
    //   const landingPos = landingRef.current.getBoundingClientRect().top;
    //   const servicesPos = servicesRef.current.getBoundingClientRect().top;

    //   // Determine which section is closer to the top and scroll to it
    //   const scrollTo =
    //     Math.abs(landingPos) < Math.abs(servicesPos)
    //       ? landingRef.current
    //       : servicesRef.current;

    //   scrollTo.scrollIntoView({ behavior: 'smooth' });
    // };

    // window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     if (scrollTimeout) {
  //       clearTimeout(scrollTimeout);
  //     }
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // Hide the entire landing page while checking authentication
  if (isCheckingAuth) return null;

  const handleLoginClick = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className={styles.background} ref={landingRef}>
        <LandingHeader />
        <div className={styles.container}>
          <div>
            <p className={styles.heading}>AI Curated corporate wellness program</p>
            <p className={styles.subHeading}>MyEasyPharma</p>
            <button className={styles.started_btn} onClick={handleLoginClick}>Get started for free</button>
            <button className={styles.services_btn} onClick={scrollToServices}>&#x25BC; Our Services</button>
          </div>
          <div style={{ alignItems: "right" }}>
            <img src="/LandingPage/hero_image.png" alt="Hero" />
          </div>
        </div>
        {showLogin && <LogInForm onClose={handleCloseLogin} />}
      </div>
      <div ref={servicesRef} style={{zIndex:"-100"}}>
        <OurServices />
      </div>
    </>
  );
};

export default LandingPage;
