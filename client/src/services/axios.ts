// src/utils/axiosInstance.ts
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// Create an axios instance with base URL and default settings
const axiosInstance = axios.create({
    baseURL: BASE_URL,  // Replace with your API's base URL
    headers: {
        "Content-Type": "application/json", // Default content type
    },
});
axiosInstance.interceptors.request.use((cfg) => {
    const token = localStorage.getItem("authToken");
    // if (token)
    //     cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
})
// axiosInstance.urequest.use((config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export default axiosInstance;

// // Optional: Add request interceptors (e.g., for auth tokens)
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Add auth token if available
//         const token = localStorage.getItem("authToken");
//         if (token) {
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Optional: Add response interceptors (e.g., to handle errors globally)
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Handle errors globally (e.g., redirect to login on 401)
//         if (error.response && error.response.status === 401) {
//             // Handle unauthorized access (e.g., redirect to login)
//             console.error("Unauthorized! Redirecting to login.");
//             // history.push("/login"); // Redirect to login page if using react-router
//         }
//         return Promise.reject(error);
//     }
// );

