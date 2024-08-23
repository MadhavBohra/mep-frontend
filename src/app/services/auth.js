

export const setToken = (token, refreshToken) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('refreshToken', refreshToken);
  console.log('Auth Token:', token);
  console.log('Refresh Token:', refreshToken);
};

export const getToken = () => localStorage.getItem('authToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const clearTokens = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
};