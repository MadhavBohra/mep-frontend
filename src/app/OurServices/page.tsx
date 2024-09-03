import React from 'react'
import styles from './OurServices.module.css'
import ServicesCard from '../components/ServicesCard/ServicesCard'

const OurServices = () => {
  return (
    <div className={styles.background}>
      <h1>Our Services</h1>
      <div className={styles.cardHolder}>
        <ServicesCard image="OurServices/image-9@2x.png"
        msg={`Delivering Health \n and wellness \n by AYUSH`}
        ></ServicesCard>
        <ServicesCard image="OurServices/image-10@2x.png"
        msg={`Personalised Health \n Plan for Employees!`}
        ></ServicesCard>
        <ServicesCard image="OurServices/image-11@2x.png"
        msg={`Enable Productive & \n Healthier \n Corporates!`}
        ></ServicesCard>
      </div>
    </div>
  )
}

export default OurServices