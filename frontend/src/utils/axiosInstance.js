import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    withCredentials: true, // MUST be true — your backend auth uses httpOnly cookies, not headers, so this is what actually sends the login session on every request
});