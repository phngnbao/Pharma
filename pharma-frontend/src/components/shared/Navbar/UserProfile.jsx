import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import {
    FaUser,
    FaSignOutAlt,
    FaUserEdit,
    FaTachometerAlt,
    FaChevronDown
} from 'react-icons/fa';

const UserProfile = ({ isProfileDropdownOpen, setIsLanguageDropdownOpen, setIsProfileDropdownOpen, closeDropdowns }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileDropdownOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    return (
        <div className="relative">
            <button
                onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    setIsLanguageDropdownOpen(false);
                }}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <FaUser className="w-4 h-4 text-white" />
                    </div>
                )}
                <FaChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.displayName || 'User'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                        </p>
                    </div>
                    <Link
                        to="/update-profile"
                        onClick={closeDropdowns}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        <FaUserEdit className="w-4 h-4 mr-2" />
                        Update Profile
                    </Link>
                    <Link
                        to={user.role === 'admin' ? '/dashboard/admin' : user.role === 'seller' ? '/dashboard/seller' : '/dashboard'}
                        onClick={closeDropdowns}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        <FaTachometerAlt className="w-4 h-4 mr-2" />
                        {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'seller' ? 'Seller Dashboard' : 'Dashboard'}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        <FaSignOutAlt className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserProfile
