import { useState } from 'react';
import { FaHome, FaCreditCard, FaUser, FaBullhorn } from 'react-icons/fa';
import Loading from '../../../components/ui/Loading/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuth } from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useTitle, PAGE_TITLES } from '../../../hooks/useTitle';

// Import components
import UserHome from './components/UserHome/UserHome';
import UserPaymentHistory from './components/UserPaymentHistory/UserPaymentHistory';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import AdvertisementView from './components/AdvertisementView/AdvertisementView';

const UserDashboard = () => {
    useTitle(PAGE_TITLES.USER_DASHBOARD);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [activeTab, setActiveTab] = useState('home');

    // get user statistics
    const { data: userStats, isLoading } = useQuery({
        queryKey: ['userStats', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user-stats/${user?.email}`);
            return response.data;
        }
    });

    // when data isLoading
    if (isLoading) {
        return <Loading />;
    }

    const tabs = [
        { id: 'home', label: 'Dashboard', icon: FaHome },
        { id: 'payment-history', label: 'Payment History', icon: FaCreditCard },
        { id: 'advertisements', label: 'Quảng Cáo', icon: FaBullhorn },
        { id: 'profile', label: 'Update Profile', icon: FaUser },
    ];

    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'home':
                return <UserHome userStats={userStats} user={user} />;
            case 'payment-history':
                return <UserPaymentHistory />;
            case 'advertisements':
                return <AdvertisementView />;
            case 'profile':
                return <UpdateProfile user={user} />;
            default:
                return <UserHome userStats={userStats} user={user} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back to Home Button */}
                <div className="mb-4">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
                    >
                        <FaHome /> Quay lại Trang Chủ
                    </button>
                </div>
                {/* Tab Navigation */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex space-x-8 px-6" aria-label="Tabs">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Active Component */}
                {renderActiveComponent()}
            </div>
        </div>
    );
};

export default UserDashboard;
