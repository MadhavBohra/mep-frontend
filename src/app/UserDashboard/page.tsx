'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import StepCounter from '../components/StepCounter/Stepcounter';
import CalorieCounter from '../components/CalorieCounter/CalorieCounter';
import Watertaken from '../components/WaterTaken/Watertaken';
import Report from '../components/Report/Report';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Calendar from '../components/Calendar/DatePicker';
import UpcomingEvents from '../components/UpcomingEvent/UpcomingEvent';
import PostWorkoutSessionCard from '../components/PostWorkout/PostWorkout';
import Header from '../components/LandingHeader/Header';
import UsernameCard from '../components/UsernameCard/UsernameCard';
import BarsDataset from '../components/Chart/Chart';
import Reminder from '../components/Reminder/Reminders';
import Loader from '../components/Loader/Loader';

import { getRefreshToken, getToken, setToken, clearTokens } from '../services/auth';
import {jwtDecode} from 'jwt-decode';

import styles from './UserDashboard.module.css';

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  bloodGroup: string;
  height: string;
  weight: string;
  profilePhoto: string;
  user: string;
}

interface DecodedToken {
  exp?: number;
}


const fetchUserData = async (authToken: string): Promise<UserData | null> => {
  try {
    const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (profileResponse.status === 404) {
      // Throw an error if the response is a 404
      throw new Error('User profile not found');
    }

    if (profileResponse.ok) {
      const data = await profileResponse.json();
      return data;
    } else {
      console.error('Failed to fetch user data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if exp exists and compare it with the current time
    return decodedToken.exp ? decodedToken.exp < currentTime : true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const refreshAccessToken = async (refreshToken: string | null): Promise<string | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    if (!response.ok) {
      console.error('Failed to refresh access token', response.statusText);
      return null;
    }

    const data = await response.json();

    // Assuming the new access token is in the 'accessToken' field of the response
    setToken(data.accessToken,data.refreshToken);

    // Optionally store the new access token in localStorage or any other storage mechanism
    return data;
  } catch (error) {
    console.error('Error while refreshing access token:', error);
    return null;
  }
};

const UserDashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();



useEffect(() => {
  const checkAndFetchData = async () => {
    const token = getToken();

    if (isTokenExpired(token)) {
      console.log("Token Expired");

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        
        if (!newAccessToken) {
          clearTokens();
          router.replace('/LandingPage');
          return; // Exit if refresh token failed
        }
      } else {
        router.replace('/LandingPage');
        return;
      }
    }

    if (!token) {
      router.replace('/LandingPage');
    } else {
      try {
        const data = await fetchUserData(token);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/UserProfile'); // Redirect to UserProfile on error
      } finally {
        setIsLoading(false);
      }
    }
  };

  checkAndFetchData();
}, [router]);


  if (isLoading) {
    return <Loader></Loader>
  }



  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.dashboard_container}>
        <p>Dashboard Overview</p>
        <div style={{ display: 'flex' }}>
          <div className={styles.dashboard_container_left}>
            <UsernameCard
              name={`${userData?.firstName} ${userData?.lastName}`}
              message="Have a nice day and don’t forget to take care of your health!"
            />
            <div style={{ display: 'flex' }}>
              <div style={{ width: '60%', marginTop: '40px'}}>
                <BarsDataset />
                <div style={{ display: 'flex', width: '100%' }}>
                  <div style={{ flex: 1, marginTop: '20px' }}>
                    <Reminder
                      dur1="48 min"
                      ex1="stretching"
                      dur2="32 min"
                      ex2="Mind training"
                    />
                  </div>
                  <div style={{ flex: 1, marginTop: '20px', marginLeft: '10px' }}>
                    <Report weight={userData?.weight || 'N/A'} />
                  </div>
                </div>
              </div>
              <div style={{ width: '25%', margin: '40px' }}>
                <StepCounter steps="202" />
                <CalorieCounter calories="408" />
                <Watertaken water="87" />
              </div>
            </div>
          </div>
          <div className={styles.dashboard_container_middle}></div>
          <div className={styles.dashboard_container_right} style={{ width: '20%', marginLeft: '100px' }}>
            <ProfileCard
              Name={`${userData?.firstName} ${userData?.lastName}`}
              Age={(userData ? (new Date().getFullYear() - new Date(userData.dob).getFullYear()).toString() : 'N/A')}
              Address={userData?.address || 'N/A'}
              Blood_Group={userData?.bloodGroup || 'N/A'}
              Height={userData?.height || 'N/A'}
              Weight={userData?.weight || 'N/A'}
              ProfileImage={userData?.profilePhoto || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
