'use client';

import React, { useState } from "react";
import Link from "next/link";
import styles from "./LandingPage.module.css";
import LandingHeader from "../components/LandingHeader/Header";
import LogInForm from "../components/LogIn/LogInForm";  // Import LogInForm

const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

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
        <p className={styles.t1}>AI Curated corporate wellness program</p>
        <p className={styles.t2}>MyEasyPharma</p>
        <button className={styles.b1} onClick={handleLoginClick}>Get started for free</button>
        <Link href='/OurServices'><button className={styles.b2}>&#x25BC; Our Services</button></Link>
      </div>
      {showLogin && <LogInForm onClose={handleCloseLogin} />}
    </div>
  );
}

export default LandingPage;