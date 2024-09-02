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
    <div className={styles.background}>
      <LandingHeader />
      <div className={styles.container}>
          <div className={styles.heading}>
            <p>Have questions about our products, support services, or</p>
            <p>anything else? Let us know and we'll get back to you.</p>
          </div>

          <div className={styles.subContainer}>
            <div className={styles.subContainerLeft}>
              <p>
                Corporate Address:
              </p>
              <p>
                Myeasypharma Pvt Ltd
              </p>
              <p>
                Unit 101, Oxford Towers 139, HAL Old Airport Rd H.A.L II
              </p>
              <p>
                Stage Bangalore, Karnataka, India, 560008
              </p>
              <br></br>
              <br></br>
              <br></br>
              <p>
                Operating Address:
              </p>
              <p>
              252, Upper Ground Floor. Deepali, Pitampura,
              </p>
              <p>
              Delhi-110034
              </p>
              <br></br>
              <br></br>
              <br></br>
            </div>
            <div className={styles.subContainerMid}>
              <span></span>
            </div>
            <div className={styles.subContainerRight}>
              <p>
                Contacts :
              </p>
              <p>
                Email: info@myeasypharma.in
              </p>
              <p>
                Phone: +91-9315909654
              </p>
            </div>
          </div>

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

  );
};

export default Contact;
