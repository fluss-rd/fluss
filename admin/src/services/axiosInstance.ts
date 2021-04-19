import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-3-91-104-58.compute-1.amazonaws.com:5000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

export default axiosInstance;

