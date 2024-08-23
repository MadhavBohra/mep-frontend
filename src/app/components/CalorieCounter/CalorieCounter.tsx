'use client';

import styles from './Caloriecounter.module.css';

interface CalorieCounterProps {
  calories: string;
}

const CalorieCounter: React.FC<CalorieCounterProps> = ({calories}) => {
  return (
    <div className={styles.card} >
      <div className={styles.imageContainer}>
        <img src="/UserDashboard/CalorieBurn.png" alt="Meditation" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
      <p className={styles.calorie}>{calories}<span className={styles.cal}> kcal</span></p>
      <p className={styles.message}>Calories burned</p>
      </div>
      
    </div>
  );
}

export default CalorieCounter;
