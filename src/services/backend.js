import axiosInstance from './axiosInstance';

const authService = {
  signup: async (name, email, password, ref=null) => {
    try {
      const response = await axiosInstance.post('/signup', {
        user: { name, email, password }, ref
      });
      return response;
    } catch (error) {
      console.error('Signup error', error.response?.data);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      if (response.status === 200) {
        const token = response.headers.authorization;
        localStorage.setItem('token', token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.delete('/logout');
      return { status: { code: 200, message: 'Logged out successfully' } };
    } catch (error) {
      console.error('Logout error', error.response?.data);
    } finally {
      localStorage.removeItem('token');
    }
  },

  fetchMembers: async () => {
    try {
      const response = await axiosInstance.get('/members');
      return response.data;
    } catch (error) {
      console.error('Fetch members error', error.response?.data);
      throw error;
    }
  },

  sendInvite: async (email) => {
    try {
      const response = await axiosInstance.post('/members/invite', { email });
      return response;
    } catch (error) {
      console.error('Invite error', error.response?.data);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/me');
      return response.data.user;
    } catch (error) {
      return null
    }
  },
};

export default authService;