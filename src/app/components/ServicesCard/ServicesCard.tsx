import React from 'react'
import styles from './ServicesCard.module.css'

interface ServicesCardProps{
    image:string;
    msg:string;
}

const ServicesCard: React.FC<ServicesCardProps> = ({image,msg}) => {
  return (
    <div className={styles.background}>
      <img src={image} alt="Service" />
      <p style={{ whiteSpace: 'pre-line' }}>{msg}</p>
      <img src="OurServices/arrow-2.svg" style={{height:"30px"}}></img>
    </div>
  )
}

export default ServicesCard