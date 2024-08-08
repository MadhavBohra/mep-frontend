'use client';

import { FunctionComponent } from "react";
// import ProductSupport from "../components/ProductSupport/ProductSupport";
// import SocialMedia from "../components/SocialMedia/SocialMedia";
import React, { useState, useEffect } from "react";
import styles from './Contact.module.css';
//import Header from "../components/LandingHeader/Header";
import LandingHeader from "../components/LandingHeader/Header";
// import UserDashboardHeader from "../components/UserDashboardHeader/Header";



const Contact: FunctionComponent = () => {
  return (
    <div>
      <LandingHeader />
      <div className={styles.container}>
          <div className={styles.productsupport}>
            <p className={styles.phead}>Have questions about our products, support services, or
              anything else? Let us know and we'll get back to you.</p>
          </div>
          <div className={styles.address}>
            <h3 className={styles.adhead}>Corporate Address:</h3>
            <p className={styles.adtext}>Myeasypharma Pvt Ltd
              Unit 101, Oxford Towers 139, HAL Old Airport Rd H.A.L II Stage Bangalore, Karnataka, India, 560008</p>
            <h3 className={styles.adhead2}>Operating Address:</h3>
            <p className={styles.adtext2}>252, Upper Ground Floor. Deepali, Pitampura,
              Delhi-110034</p>
            <h3 className={styles.chead}>Contacts</h3>
            <p className={styles.ctext1}> Email: info@myeasypharma.in</p>
            <p className={styles.ctext2}> Phone: +91-9315909654</p>
          </div>
          <div className={styles.social}>
            <img src="/socialx.png" alt="x" />
            <img src="/socialfacebook.png" alt="facebook" />
            <a href="https://www.instagram.com/myeasypharma?igsh=MW5wcHl3eWdoa25mOQ==" target="_blank">
            <img src="/socialinsta.png" alt="instagram" />
            </a>
            <a href="https://in.linkedin.com/company/myeasypharma" target="_blank">
            <img src="/sociallinkedin.png"  alt="linkedin" />
            </a>
          </div>
        </div>
      </div>
  );
};

export default Contact;
