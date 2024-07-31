import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.10.103.63:8080/api/v3",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Error fetching token from AsyncStorage:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        window.location = "login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;