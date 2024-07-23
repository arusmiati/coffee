import axios from 'axios';

export const login = async (username, password) => {
  const url = 'https://soal.staging.id/oauth/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_secret', '0a40f69db4e5fd2f4ac65a090f31b823');
  params.append('client_id', 'e78869f77986684a');
  params.append('username', username);
  params.append('password', password);

  try {
    const response = await axios.post(url, params);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
