import axiosInstance from "../api/axiosInstance";

const saveUserDataOnDb = async (user) => {
    try {
        await axiosInstance.post("/users", {
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            photoURL: user.photoURL,
        });
    } catch (error) {
        console.error("Error saving user data:", error);
    }
};

export default saveUserDataOnDb;
