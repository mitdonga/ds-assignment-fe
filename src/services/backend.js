import axios from 'axios';

const API_URL = 'http://localhost:3000';

const authService = {
  signup: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        user: { name, email, password }
      }, { withCredentials: true });
      
      if (response.data.status.code === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.status.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Signup error', error.response?.data);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        user: { email, password }
      }, { withCredentials: true });
      
      if (response.data.status.code === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.status.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error', error.response?.data);
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.delete(`${API_URL}/logout`, { withCredentials: true });
      localStorage.removeItem('user');
      return { status: { code: 200, message: 'Logged out successfully' } };
    } catch (error) {
      console.error('Logout error', error.response?.data);
      throw error;
    }
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  getDashboardData: async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard`, { 
        withCredentials: true 
      });
      return response.data;
    } catch (error) {
      console.error('Dashboard error', error.response?.data);
      throw error;
    }
  }
};

export default authService;