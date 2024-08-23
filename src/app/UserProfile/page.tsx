'use client';

import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import LandingHeader from "../components/LandingHeader/Header";
import { getToken } from '../services/auth';
import { useRouter } from 'next/navigation';

interface UserData {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
    bloodGroup: string;
    height: string;
    weight: string;
    profilePhoto: string | null; // Adjust to match the profile photo URL
}

export default function UserProfile() {
    const router = useRouter();
    const [formData, setFormData] = useState<UserData>({
        username:'',
        email:'',
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        bloodGroup: '',
        height: '',
        weight: '',
        profilePhoto: null,
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
                    // Redirect to a blank page or handle accordingly
                    setFormData({
                        username:'',
                        email:'',
                        firstName: '',
                        lastName: '',
                        dob: '',
                        address: '',
                        bloodGroup: '',
                        height: '',
                        weight: '',
                        profilePhoto: null,
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
        if (e.target.files) {
            setFormData({
                ...formData,
                profilePhoto: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = getToken(); // Replace with the actual token you retrieve from auth.
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key as keyof typeof formData] as string | Blob);
        });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            // Handle success
            alert('Profile updated successfully');
            router.push('/UserDashboard');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', backgroundImage: "url('/Background.png')", height: '100vh', overflow: 'hidden' }}>
                <LandingHeader />
                <div className="profile-container">
                    <div className="profile-sidebar">
                        <img
                            src={formData.profilePhoto || '/Default_pfp.svg.png'}
                            alt="Profile Picture"
                            className="profile-picture"
                        />
                        <h2>{formData.username || 'testuser'}</h2>
                        <p>{formData.email || 'edogaru@mail.com.my'}</p>
                    </div>
                    <div className="profile-main">
                        <h1>Profile Settings</h1>
                        <form className="profile-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter first name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Enter last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Enter address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="bloodGroup">Blood Group</label>
                                    <input
                                        type="text"
                                        id="bloodGroup"
                                        name="bloodGroup"
                                        placeholder="Enter blood group"
                                        value={formData.bloodGroup}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="height">Height (cm)</label>
                                    <input
                                        type="number"
                                        id="height"
                                        name="height"
                                        placeholder="Enter height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="weight">Weight (kg)</label>
                                    <input
                                        type="number"
                                        id="weight"
                                        name="weight"
                                        placeholder="Enter weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profilePhoto">Profile Photo</label>
                                <input
                                    type="file"
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit" className="submit-button">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
