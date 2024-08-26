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
    profilePhoto: string | File | null;
}

export default function UserProfile() {
    const router = useRouter();
    const [formData, setFormData] = useState<UserData>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
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
                        username: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        dob: '',
                        address: '',
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
            profilePhoto:  null,
        };

        console.log(jsonData);
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
    
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', backgroundImage: "url('/Background.png')", height: '100vh', overflow: 'hidden' }}>
                <LandingHeader />
                <div className="profile-container">
                    <div className="profile-sidebar">
                        <img
                            src={typeof formData.profilePhoto === 'string' ? formData.profilePhoto : '/Default_pfp.svg.png'}
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