export const signUp = async (userData) => {
    try {
      const response = await fetch('https://mep-backend.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error during sign up:', error);
      throw error;
    }
  };
  