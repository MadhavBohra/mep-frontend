'use client';

import React, { useEffect, useState } from 'react';
import LandingHeader from "../components/LandingHeader/Header";
import { getToken } from '../services/auth';
import { useRouter } from 'next/navigation';
import styles from './UserProfile.module.css';

interface UserData {
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
    bloodGroup: string;
    height: string;
    weight: string;
    profilePhoto: string | File | null;
}

export default function UserProfile() {
    const router = useRouter();
    const [formData, setFormData] = useState<UserData>({
        firstName: '',
        lastName: '',
        dob: '',
        address: 'BITS PILANI',
        bloodGroup: '',
        height: '',
        weight: '',
        profilePhoto: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = getToken();
            if (!token) {
                router.replace('/LandingPage');
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else if (response.status === 404) {
                    setFormData({
                        firstName: '',
                        lastName: '',
                        dob: '',
                        address: 'BITS PILANI',
                        bloodGroup: '',
                        height: '',
                        weight: '',
                        profilePhoto: ''
                    });
                } else {
                    throw new Error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                setFormData({
                    ...formData,
                    profilePhoto: file,
                });
            } else {
                alert('Please select an image file.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const token = getToken();
    
        // Prepare JSON data, ensuring all fields are included, even with null values
        const jsonData = {
            firstName: formData.firstName || null,
            lastName: formData.lastName || null,
            dob: formData.dob || null,
            address: formData.address || null,
            bloodGroup: formData.bloodGroup || null,
            height: formData.height || null,
            weight: formData.weight || null,
            profilePhoto:  null, // Handle profile photo separately if needed
        };

        console.log(jsonData);
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            console.log(jsonData);
            console.log(response);
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            alert('Profile updated successfully');
            router.push('/UserDashboard');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile');
        }
    };

    return (
        <div className={styles.background}>
            <LandingHeader />
            <div className={styles.masterContainer}>
                <h1>User Profile</h1>
                <div className={styles.container}>
                    <div className={styles.container1}>
                        <img 
                            src="UserProfile/Default_pfp-removebg-preview.png"
                            alt="Profile Picture" 
                        />
                        <p>Username</p>
                        <br></br>
                        <p>testuser@gmail.com</p>
                    </div>
                    <div className={styles.container2}>
                        <form onSubmit={handleSubmit}>
                            <div  className={styles.formSubContainer}>
                                <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                    <label>First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstName" 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                    <label>Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastName" 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.formSubContainer}>
                                <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                    <label>Date of Birth</label>
                                    <input 
                                        type="date" 
                                        id="dob" 
                                        name="dob" 
                                        value={formData.dob} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                    <label>Blood Group</label>
                                    <input 
                                        type="text" 
                                        id="bloodGroup" 
                                        name="bloodGroup" 
                                        value={formData.bloodGroup} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div  className={styles.formSubContainer}>
                                <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                    <label>Height (cm)</label>
                                    <input 
                                        type="number" 
                                        id="height" 
                                        name="height" 
                                        value={formData.height} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                    <label>Weight (kg)</label>
                                    <input 
                                        type="number" 
                                        id="weight" 
                                        name="weight" 
                                        value={formData.weight} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            {/* Optional Profile Photo */}
                            {/* <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                <label>Profile Photo</label>
                                <input 
                                    type="file" 
                                    id="profilePhoto" 
                                    name="profilePhoto" 
                                    onChange={handleFileChange}
                                    style={{backgroundColor:"transparent"}}
                                />
                            </div> */}
                            <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                                <button type="submit" className={styles.submitButton}>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
