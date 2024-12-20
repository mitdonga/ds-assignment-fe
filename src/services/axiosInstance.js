import axios from "axios";

const API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json",
  }
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401) {
        window.location.href = '/login'
      }
    }
    const customError = {
      status: err.response?.status || 500,
      message: err.response?.data?.message || "Something went wrong!",
      data: err.response?.data || null,
    };
    return Promise.reject(customError);
  }
);
export default axiosInstance;