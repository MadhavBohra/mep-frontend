'use client'

import React, { useState, useEffect, FunctionComponent } from "react";
//import classnames from "classnames";
import styles from "./AboutUs.module.css";
import LandingHeader from "../components/LandingHeader/Header";
// import UserDashboardHeader from "../components/UserDashboardHeader/Header";

// Define the MissionContainer component within the AboutUs file
export type MissionContainerType = {
  className?: string;
};

// Main AboutUs component
const AboutUs: React.FC = () => {
  return (
    <div className={styles.background}>
      <LandingHeader />
      <div className={styles.pagedetails}>
        <div className={styles.heading}> 
          <h2 className={styles.headtext}>MyEasyPharma is leading the way in integrating technology with healthcare to
revolutionize preventive health for working professionals. We offer holistic solutions that
combine traditional Ayurveda with modern medicine, supported by research tailored to
your health profile and specific conditions</h2>
          <h3 className={styles.vishead}>Vision</h3>
          <p className={styles.vistext}>At MyEasyPharma, our vision is to create a one-stop destination to take care of your
health and well-being amid a busy schedule, backed by research and integrated with AI
support. To pioneer a shift in global health paradigms, focusing not just on treating
illnesses but on preventing them before they occur. Our primary aim is to improve
employee health, leading to increased and enhanced efficiency in the workplace.
</p>
          <img src="/Vision.png" alt="Vision" className={styles.visimg}/>
          <h3 className={styles.whathead}>What We Do?</h3>
          <p className={styles.whattext}>We offer comprehensive professional health advice on various parameters such as diet,
physical activity, mental health, sleep hygiene, from trivial yet important conditions like
back pain to serious conditions like cancer, all aimed at reducing susceptibility to
workplace-induced lifestyle disorders and managing at holistic level. Our guidance is
personalized to your environment or Prakriti.
</p>
          <img src="/Stethoscope.png" alt="Steth" className={styles.whatimg}/>
          <h3 className={styles.misshead}>Mission</h3>
          <p className={styles.misstext}>Our mission is to alleviate the impact of chronic diseases, their symptoms and enhance
public health by delivering specialized and meticulously curated corporate wellness
initiatives</p>
          <img src="/Mission.png" alt="mission" className={styles.missimg}/>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
