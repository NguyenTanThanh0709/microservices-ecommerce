import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8222/',
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'multipart/form-data',
        // other default headers
    }
});

// Add a request interceptor to attach the token to every request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Example: Fetch token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
    