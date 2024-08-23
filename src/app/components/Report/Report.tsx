// src/components/Report.js
'use client';

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Report.module.css';

// Assuming ReportProps is an interface or type that includes weight
interface ReportProps {
  weight: string;
}

const Report: React.FC<ReportProps> = ({ weight }) => {
  // Ensure weight is a string, otherwise convert it
  const weightValue = weight || "90";
  const weightPercentage = 100 - parseInt(weightValue, 10); // assuming weight is a percentage decrease

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Reports</h2>
      <div className={styles.reportItem} style={{ display: "flex" }}>
        <div><CircularProgress variant="determinate" value={weightPercentage} className={styles.cir} /></div>
        <p className={styles.text}>Weight {weightValue}% decrease</p>
      </div>
      <div className={styles.reportItem}>
        <div><CircularProgress variant="determinate" value={weightPercentage} className={styles.cir} /></div>
        <p className={styles.text}>Weight {weightValue}% decrease</p>
      </div>
    </div>
  );
};

export default Report;
