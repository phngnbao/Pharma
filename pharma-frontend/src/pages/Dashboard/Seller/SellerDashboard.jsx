import React, { useContext, useState, useEffect } from 'react';
import {
    FaHome,
    FaPills,
    FaCreditCard,
    FaBullhorn,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaChevronRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useTitle, PAGE_TITLES } from '../../../hooks/useTitle';

// Import components
import SellerHome from './components/SellerHome/SellerHome';
import ManageMedicines from './components/ManageMedicines/ManageMedicines';
import PaymentHistory from './components/PaymentHistory/PaymentHistory';
import AdvertiseRequest from './components/AdvertiseRequest/AdvertiseRequest';
import { AuthContext } from '../../../context/AuthContext';

const SellerDashboard = () => {
    useTitle(PAGE_TITLES.SELLER_DASHBOARD);
    const [activeTab, setActiveTab] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle responsive behavior and keyboard events
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [sidebarOpen]);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            navigate('/auth/login');
        } catch {
            toast.error('Failed to logout');
        }
    };

    const sidebarItems = [
        { id: 'home', label: 'Dashboard', icon: FaHome },
        { id: 'medicines', label: 'Manage Medicines', icon: FaPills },
        { id: 'payments', label: 'Payment History', icon: FaCreditCard },
        { id: 'advertise', label: 'Advertise Request', icon: FaBullhorn },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <SellerHome />;
            case 'medicines':
                return <ManageMedicines />;
            case 'payments':
                return <PaymentHistory />;
            case 'advertise':
                return <AdvertiseRequest />;
            default:
                return <SellerHome />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div className={`!fixed inset-y-0 left-0 z-50 w-72 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <FaPills className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Seller Panel</h2>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                        aria-label="Close sidebar"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">
                                    {user?.displayName?.charAt(0).toUpperCase() || 'S'}
                                </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                                {user?.displayName || 'Seller'}
                            </p>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Seller Account</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`group relative w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 transform scale-[1.02]'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:text-emerald-700 dark:hover:text-emerald-400'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg transition-colors duration-200 ${isActive
                                            ? 'bg-white/20'
                                            : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/20'
                                        }`}>
                                        <Icon size={18} />
                                    </div>
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                <FaChevronRight
                                    className={`w-4 h-4 transition-all duration-200 ${isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-60'
                                        }`}
                                />

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-1 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 group-hover:bg-red-200 dark:group-hover:bg-red-900/40 transition-colors duration-200">
                                <FaSignOutAlt size={18} />
                            </div>
                            <span className="font-medium">Logout</span>
                        </div>
                        <FaChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-0 min-w-0 lg:pl-72">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center space-x-4">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors duration-200"
                                aria-label="Open sidebar"
                            >
                                <FaBars size={18} />
                            </button>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                        {sidebarItems.find(item => item.id === activeTab)?.label?.charAt(0) || 'D'}
                                    </span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                                </h1>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="ml-4 flex items-center gap-2 px-3 py-1.5 text-sm bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg transition-colors duration-200"
                                >
                                    <FaHome size={14} />
                                    Quay lại Trang Chủ
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back,</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {user?.displayName || 'Seller'}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    {user?.displayName?.charAt(0).toUpperCase() || 'S'}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6 lg:p-8 max-w-7xl mx-auto">
                    <div className="animate-in fade-in duration-300">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;
