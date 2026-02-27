import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

export default axiosInstance;
