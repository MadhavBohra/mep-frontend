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
      <div className={styles.heading}>
        <p>MyEasyPharma is at the forefront of merging technology with healthcare to innovate preventive health measures for working professionals.</p>
      </div>

      <div className={styles.container}>
        <p className={styles.containerHeading}>Vision</p>
        <div className={styles.containerContent}>
        <p>
          At MyEasyPharma, our vision is to create a one-stop destination to take care of your
          health and well-being amid a busy schedule, backed by research and integrated with AI
          support. To pioneer a shift in global health paradigms, focusing not just on treating
          illnesses but on preventing them before they occur. Our primary aim is to improve
          employee health, leading to increased and enhanced efficiency in the workplace.
        </p>
        <img src="/Vision.png" alt="Vision"/>
        </div>
      </div>

      <div className={styles.container}>
        <p className={styles.containerHeading}>What We Do?</p>
        <div className={styles.containerContent}>
        <p>
          We offer comprehensive professional health advice on various parameters such as diet,
          physical activity, mental health, sleep hygiene, from trivial yet important conditions like
          back pain to serious conditions like cancer, all aimed at reducing susceptibility to
          workplace-induced lifestyle disorders and managing at holistic level. Our guidance is
          personalized to your environment or Prakriti.
        </p>
        <img src="/Stethoscope.png" alt="Steth"/>
        </div>
      </div>

      <div className={styles.container}>
        <p className={styles.containerHeading}>Mission</p>
        <div className={styles.containerContent}>
        <p>
          Our mission is to alleviate the impact of chronic diseases, their symptoms and enhance
          public health by delivering specialized and meticulously curated corporate wellness
          initiatives
        </p>
        <img src="/Mission.png" alt="mission"/>
        </div>
      </div>


    </div>
  );
};

export default AboutUs;
