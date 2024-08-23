'use client';

import styles from './Watertaken.module.css';

interface WatertakenProps {
  water: string;
}

const Watertaken: React.FC<WatertakenProps> = ({water}) => {
  return (
    <div className={styles.card} >
      <div className={styles.imageContainer}>
        <img src="/UserDashboard/Watertaken.png" alt="Meditation" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
      <p className={styles.water}>{water}<span className={styles.watertext}> litres</span></p>
      <p className={styles.message}>Water taken</p>
      </div>
      
    </div>
  );
}

export default Watertaken;
