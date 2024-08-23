'use client';

import styles from './Stepcounter.module.css';

interface StepCounterProps {
  steps: string;
}

const StepCounter: React.FC<StepCounterProps> = ({ steps }) => {
  return (
    <div className={styles.card} >
      <div className={styles.imageContainer}>
        <img src="/UserDashboard/Feet.png" alt="Meditation" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
      <p className={styles.steps}>{steps}<span className={styles.count}>/3000</span></p>
      <p className={styles.message}> Steps Taken</p>
      </div>
      
    </div>
  );
}

export default StepCounter;
