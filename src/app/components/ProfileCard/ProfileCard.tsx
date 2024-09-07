'use client';

import Image from 'next/image';
import styles from './ProfileCard.module.css';


interface ProfileCardProps {
    Name: string;
    Age: string;
    Address: string;
    Blood_Group: string;
    Height:string;
    Weight:string;
    ProfileImage:string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({Name,Age,Address,Blood_Group,Height,Weight,ProfileImage}) => {
  console.log(ProfileImage);
  ProfileImage = '/UserProfile/Default_pfp-removebg-preview.png';
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>

      <Image
        src={ProfileImage} 
        alt="Avatar"
        width={50}
        height={50}
        className={styles.roundImage} // Add this class
/>

      </div>
      <h2 className={styles.name}>{Name}</h2>
      <p className={styles.ageLocation} style={{textAlign:'center'}}>{Age} years old </p>
      <p style={{textAlign:'center'}}>{Address}</p>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <p>Blood</p>
          <p>{Blood_Group}</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.infoItem}>
          <p>Height</p>
          <p>{Height} cm</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.infoItem}>
          <p>Weight</p>
          <p>{Weight} kgs</p>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;
