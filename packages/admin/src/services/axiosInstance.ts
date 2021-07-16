import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

export default axiosInstance;

