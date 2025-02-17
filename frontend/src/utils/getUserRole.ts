import { jwtDecode } from 'jwt-decode';

interface jwt {
  id: string;
  username: string;
  email: string;
  role: string;
}

const getUserRole = () => {
  const token = localStorage.getItem('jwt-token');
  if (token) {
    try {
      const decodedToken = jwtDecode<jwt>(token);
      return decodedToken.role;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
  return null;
};

export { getUserRole };
