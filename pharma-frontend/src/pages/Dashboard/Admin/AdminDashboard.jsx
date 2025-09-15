import React, { useState, useEffect } from 'react';
import {
    FaHome,
    FaUsers,
    FaTags,
    FaDollarSign,
    FaChartBar,
    FaBars,
    FaTimes,
    FaBullhorn
} from 'react-icons/fa';
import { useTitle, PAGE_TITLES } from '../../../hooks/useTitle';
import CloudinaryImage from '../../../components/ui/CloudinaryImage/CloudinaryImage';

// Import all admin components
import AdminHome from './components/AdminHome/AdminHome';
import ManageUsers from './components/ManageUsers/ManageUsers';
import ManageCategory from './components/ManageCategory/ManageCategory';
import PaymentManagement from './components/PaymentManagement/PaymentManagement';
import SalesReport from './components/SalesReport/SalesReport';
import ManageAdvertisements from './components/ManageAdvertisements/ManageAdvertisements';
import { useAuth } from '../../../hooks/useAuth';

const AdminDashboard = () => {
    useTitle(PAGE_TITLES.ADMIN_DASHBOARD);
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [sidebarOpen]);

    // Navigation items
    const navItems = [
        { id: 'home', label: 'Tổng quan', icon: FaHome, component: AdminHome },
        { id: 'users', label: 'Quản lý người dùng', icon: FaUsers, component: ManageUsers },
        { id: 'categories', label: 'Quản lý danh mục', icon: FaTags, component: ManageCategory },
        { id: 'payments', label: 'Quản lý thanh toán', icon: FaDollarSign, component: PaymentManagement },
        { id: 'reports', label: 'Báo cáo bán hàng', icon: FaChartBar, component: SalesReport },
        { id: 'advertisements', label: 'Quản lý quảng cáo', icon: FaBullhorn, component: ManageAdvertisements }
    ];

    const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || AdminHome;

    // Render content based on active tab
    const renderContent = () => {
        return <ActiveComponent />;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile menu button */}
            {!sidebarOpen && (<div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:shadow-xl"
                    aria-label={sidebarOpen ? 'Đóng menu' : 'Mở menu'}
                >
                    {!sidebarOpen && (
                        <FaBars className="h-5 w-5" />
                    )}
                </button>
            </div>)}


            {/* Sidebar */}
            <div
                className={`!fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out z-40 lg:z-auto`}
            >
                <div className="flex h-screen w-64 flex-col bg-white dark:bg-gray-800 shadow-2xl lg:shadow-xl">
                    {/* Logo/Header */}
                    <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg">A</span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Quản trị viên
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Hệ thống quản lý
                                </p>
                            </div>
                        </div>

                        {/* Close button for mobile */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Đóng sidebar"
                        >
                            <FaTimes className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-6 overflow-y-auto">
                        <div className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={`group flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] ${isActive
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                            }`}
                                    >
                                        <Icon
                                            className={`mr-4 h-5 w-5 flex-shrink-0 transition-colors ${isActive
                                                ? 'text-white'
                                                : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300'
                                                }`}
                                        />
                                        <span className="font-medium">{item.label}</span>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <div className="ml-auto">
                                                <div className="h-2 w-2 rounded-full bg-white opacity-75"></div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Quick Stats */}
                        {/* <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-750 rounded-xl">
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                                    Quick Stats
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                        Active Users
                                    </span>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                        1,234
                                    </span>
                                </div>
                            </div>
                        </div> */}
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                <div className="font-medium">Bảng điều khiển</div>
                                <div>Phiên bản 1.0.2</div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Trực tuyến</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main content */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="mr-4 bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
                                >
                                    <FaHome /> Trang Chủ
                                </button>
                                
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-0 lg:ml-0">
                                    {navItems.find(item => item.id === activeTab)?.label || 'Tổng quan'}
                                </h2>

                                {/* Breadcrumb for larger screens */}
                                <div className="hidden md:flex items-center ml-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span>Quản trị</span>
                                    <span className="mx-2">/</span>
                                    <span className="text-gray-900 dark:text-white font-medium">
                                        {navItems.find(item => item.id === activeTab)?.label || 'Tổng quan'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Search button for mobile */}
                                <button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>

                                {/* Admin Profile */}
                                <div className="flex items-center space-x-3">
                                    <div className="hidden sm:block text-right">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Quản trị viên</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Người quản trị</div>
                                    </div>
                                    <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <CloudinaryImage
                                            src={user?.photoURL}
                                            alt="Admin"
                                            className="h-8 w-8 rounded-lg object-cover ring-2 ring-blue-500"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 bg-gray-50 dark:bg-gray-900">
                    <div className="px-4 sm:px-6 lg:px-8 py-6">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
