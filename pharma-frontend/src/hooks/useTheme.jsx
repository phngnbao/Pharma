import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme phải được sử dụng trong ThemeProvider');
    }
    return context;
};

export default useTheme;