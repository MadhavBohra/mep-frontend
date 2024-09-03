import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './SignUpForm.module.css';
import { setToken } from '../services/auth';

type SignUpData = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
};

const SignUpForm: React.FC<{ onClose?: () => void; onSignUpComplete?: (data: SignUpData) => void }> = ({ onClose, onSignUpComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 1) {
      setFormValid(formData.email.length > 0 && formData.username.length > 0 && formData.password.length > 0);
    } else if (step === 2) {
      setFormValid(formData.firstName.length > 0 && formData.dob.length > 0 && formData.address.length > 0);
    }
  }, [formData, step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {firstName, lastName, dob, address} = formData;
    const { email, username, password } = formData;
    const dataToSend = { email, username, password };
    const dataToSendProfile = {firstName, lastName, dob, address};

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Sign up failed: ${response.statusText}`);
      }

      const data = await response.json();
      const authToken = data.accessToken;
      const refreshToken = data.refreshToken;
      setToken(authToken, refreshToken);

      if (onSignUpComplete) onSignUpComplete(data);

      const profileresponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSendProfile),
      });

      if (!profileresponse.ok) {
        throw new Error(`Sign up failed: ${profileresponse.statusText}`);
      }

      router.push('/UserDashboard');

      if (onClose) onClose();
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('Failed to sign up. Please try again.');
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formContainerRef.current && !formContainerRef.current.contains(e.target as Node)) {
      if (onClose) onClose();
    }
  };

  return (
      <div className={styles.signupContainer} onClick={handleClickOutside}>
        <div className={styles.formContainer} ref={formContainerRef} onClick={(e) => e.stopPropagation()}>
          <div className="container">
            <div>
              <h1>Welcome to MyEasyPharma</h1>
              <p>Already have an account? <Link href="/LogIn"><span>Log in</span></Link></p>
            </div>
            <img src='/logo.png' alt="Logo" className={styles.logo} />
          </div>

          {error && <div className="error">{error}</div>}

          {step === 1 && (
            <>
              <label>Email</label>
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label>
                Password
                <div className={styles.passwordToggle}>
                  <img
                    src='/eye.png'
                    alt={showPassword ? 'Hide' : 'Show'}
                    className={styles.eyeIcon}
                    onClick={toggleShowPassword}
                  />
                  <span onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
                </div>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className={styles.passwordCriteria}>
                <li>Use 8 or more characters</li>
                <li>One Uppercase character</li>
                <li>One lowercase character</li>
                <li>One special character</li>
                <li>One number</li>
              </div>
              <button type="button" className={styles.signupBtn} disabled={!formValid} onClick={handleNext}>Next</button>
            </>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className={styles.signupForm}>
              <label>First Name</label>
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <label>Last Name</label>
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <div className={styles.buttonGroup}>
                <button type="button" className={styles.signupBtn} onClick={handleBack}>Back</button>
                <button type="submit" className={styles.signupBtn} disabled={!formValid}>Create an account</button>
              </div>
            </form>
          )}
        </div>
        <div className={styles.imageContainer} ref={formContainerRef}>
          <img src="/GreenBGRight.png" alt="Side Background" />
        </div>
      </div>
  );
};

export default SignUpForm;
