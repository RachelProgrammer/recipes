// src/utils/axiosInstance.ts
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use((cfg) => {
    const token = localStorage.getItem("authToken");
    if (token)
        cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
})

export default axiosInstance;