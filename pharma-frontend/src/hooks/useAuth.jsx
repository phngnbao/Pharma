import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth phải được sử dụng trong AuthProvider');
    }
    return context;
}

export { useAuth }