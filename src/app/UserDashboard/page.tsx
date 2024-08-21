'use client';

import React, { useEffect, useState } from 'react';
import UsernameCard from '../components/UsernameCard/UsernameCard';
import StepCounter from '../components/StepCounter/Stepcounter';
import CalorieCounter from '../components/CalorieCounter/CalorieCounter';
import Watertaken from '../components/WaterTaken/Watertaken';
import Report from '../components/Report/Report';
import Reminder from '../components/Reminder/Reminders';
import styles from './UserDashboard.module.css';
import BarsDataset from '../components/Chart/Chart';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Calendar from '../components/Calendar/DatePicker';
import UpcomingEvents from '../components/UpcomingEvent/UpcomingEvent';
import PostWorkoutSessionCard from '../components/PostWorkout/PostWorkout';
import Header from '../components/LandingHeader/Header';
import axios from 'axios';
import Modal from '../components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { getToken } from '../services/auth';

<<<<<<< HEAD
=======

>>>>>>> 5bde4c7 (LogIn, SignUp and Headers Button changes)
interface UserData {
  name: string;
  age: number;
  height: string;
  weight: string;
  blood_grp: string;
  address: string;
  calories_burnt?: number;
  steps?: number;
  water_intake?: number;
}

const defaultUser: UserData = {
  name: 'Manan Jain',
  age: 20,
  height: '174',
  weight: '70',
  blood_grp: 'B+',
  address: 'BITS GOA',
  calories_burnt: 0,
  steps: 0,
  water_intake: 0
};

const fetchDataFromDB = async (userId: string): Promise<UserData | null> => {
  try {
    const res = await axios.get(`https://mep-web-front-and-back-6.onrender.com/api/v1/users/${userId}/daily`, {
      withCredentials: true,
      timeout: 10000
    });
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    return null;
  }
};

const fetchHealthDataFromDB = async (userId: string): Promise<UserData | null> => {
  try {
    const res = await axios.get(`http://localhost:3001/api/v1/users/${userId}/health`, {
      withCredentials: true,
      timeout: 10000
    });
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    return null;
  }
};

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace('/LandingPage'); // Redirect to the landing page if no token
    } else {
      setIsCheckingAuth(false); // Allow rendering if token exists
    }
  }, [router]);

  useEffect(() => {
    if (isCheckingAuth) return; // Do not fetch user data until auth is checked

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3001/api/v1/auth/me', {
          withCredentials: true,
        });

        if (userResponse.status === 200 && userResponse.data) {
          const { userId } = userResponse.data;
          const dailyData = await fetchDataFromDB(userId);
          const healthData = await fetchHealthDataFromDB(userId);

          if (dailyData && healthData) {
            setUserData({
              ...userResponse.data,
              name: healthData?.name,
              height: healthData.height,
              weight: healthData.weight,
              blood_grp: healthData.blood_grp,
              address: healthData.address,
              calories_burnt: dailyData.calories_burnt,
              steps: dailyData.steps,
              water_intake: dailyData.water_intake
            });
          } else {
            setUserData(defaultUser);
          }
        } else {
          console.error('Failed to fetch user data');
          setUserData(defaultUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(defaultUser);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isCheckingAuth]);

  const handleModalSave = async (steps: string, waterIntake: string, caloriesBurnt: string) => {
    try {
      const userResponse = await axios.get('http://localhost:3001/api/v1/auth/me', {
        withCredentials: true,
      });

      if (userResponse.status !== 200 || !userResponse.data || !userResponse.data.userId) {
        console.error('Failed to fetch user data or userId is missing');
        return;
      }

      const { userId } = userResponse.data;
      const updatedData = {
        steps: parseInt(steps),
        water: parseInt(waterIntake),
        calorie: parseInt(caloriesBurnt),
      };

      const response = await axios.post(`http://localhost:3001/api/v1/users/${userId}/daily`, updatedData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log('Data saved successfully:', response.data);
        setUserData((prevData) => {
          if (!prevData) return null;
          return {
            ...prevData,
            steps: updatedData.steps,
            water_intake: updatedData.water,
            calories_burnt: updatedData.calorie
          };
        });
        setIsModalOpen(false);
      } else {
        console.error('Error saving data:', response.data);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (isLoading || isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.background}>
      <div className={styles.headercomp}><Header /></div>
      <div className={styles.container}>
        <h1 className={styles.headerTitle}>Dashboard Overview</h1>
        <section className={styles.dashboard}>
          <div className={styles.usernamecard}>
            <UsernameCard
              name={userData?.name ?? "Manan Jain"}
              message="Have a nice day and don’t forget to take care of your health!"
            />
          </div>
          <div className={styles.profilecard}>
            <ProfileCard
              Name={userData?.name ?? "Manan Jain"}
              Age={(userData?.age ?? 20).toString()}
              Address={userData?.address ?? "BITS GOA"}
              Blood_Group={userData?.blood_grp ?? "B+"}
              Height={userData?.height ?? "174"}
              Weight={userData?.weight ?? "70"}
            />
          </div>
          <div className={styles.datepicker}><Calendar /></div>
          <div className={styles.graph}><BarsDataset /></div>
          <div className={styles.reminder}>
            <Reminder dur1="48 min" ex1="stretching" dur2="32 min" ex2="Mind training" />
          </div>
          <div className={styles.upcomingevent}><UpcomingEvents /></div>
          <div className={styles.postWorkoutSessionCard}><PostWorkoutSessionCard /></div>
          <div className={styles.report}><Report weight={userData?.weight ?? "70"} /></div>
          <div className={styles.stepcounter}><StepCounter name="Steps Taken" steps={(userData?.steps ?? 0).toString()} /></div>
          <div className={styles.caloriecounter}><CalorieCounter name="Calories Burned" calories={(userData?.calories_burnt ?? 0).toString()} /></div>
          <div className={styles.watertaken}><Watertaken name="Water Taken" water={(userData?.water_intake ?? 0).toString()} /></div>
          <button className={styles.updateButton} onClick={() => setIsModalOpen(true)}>Update Data</button>
          
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={(steps, waterIntake, caloriesBurnt) => handleModalSave(steps, waterIntake, caloriesBurnt)}
          />
          <button className={styles.historyButton}>History</button>
        </section>
      </div>
    </div>
  );
}
