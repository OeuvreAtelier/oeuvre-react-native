import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.10.103.55:8080/api/v3",
});

axiosInstance.interceptors.request.use((config) => {
  const token = AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location = "login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
