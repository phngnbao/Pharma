import axios from "axios";

// create an axios instance for API requests
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export default axiosInstance;
