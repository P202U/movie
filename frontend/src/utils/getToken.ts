export const getAuthHeaders = () => {
  const token = localStorage.getItem('jwt-token'); // or however you're storing the JWT
  return {
    authorization: `Bearer ${token}`,
  };
};
