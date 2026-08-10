import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // any request rejected with 401 means the session cookie is dead — bounce to login instead of leaving every page silently broken
        if (error.response?.status === 401 && !window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);