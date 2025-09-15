import axiosInstance from "../api/axiosInstance";
import { useAuth } from "./useAuth";

const useAxiosSecure = () => {
    const { user, loading } = useAuth()

    if (!user && loading) return null;

    axiosInstance.interceptors.request.use(async (config) => {
        if (user) {
            try {
                const token = await user.getIdToken();
                config.headers.authorization = `Bearer ${token}`;
            } catch (error) {
                console.error("Error getting ID token:", error);
            }
        }
        return config;
    });

    return axiosInstance;
}

export default useAxiosSecure;