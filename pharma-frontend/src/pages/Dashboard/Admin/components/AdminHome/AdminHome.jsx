import React from 'react';
import { FaDollarSign, FaShoppingCart, FaClock, FaCheckCircle, FaUsers, FaPills, FaChartLine } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import RevenueCard from './RevenueCard';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Loading from '../../../../../components/ui/Loading/Loading';
import { useQueryConfig, queryKeys } from '../../../../../hooks/useQueryConfig';
import ErrorDataFetching from '../../../../../components/ui/Error/ErrorDataFetching';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const queryConfig = useQueryConfig();

    // Fetch admin statistics using TanStack Query
    const { data: stats, isLoading, error, refetch } = useQuery({
        queryKey: queryKeys.adminStats,
        queryFn: async () => {
            const response = await axiosSecure.get('/admin/stats');
            return response.data;
        },
        ...queryConfig,
    });

    // Error state
    if (error) {
        return <ErrorDataFetching error={error} refetch={refetch} />;
    }

    // Loading state
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-2">Chào mừng đến với Bảng điều khiển Quản trị</h1>
                <p className="text-blue-100">
                    Quản lý nền tảng thương mại điện tử dược phẩm hiệu quả
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <span className="text-blue-200">Tỷ lệ đơn hàng thành công:</span>
                        <span className="ml-2 font-semibold">{stats?.orderSuccessRate || 0}%</span>
                    </div>
                    <div>
                        <span className="text-blue-200">Tỷ lệ hàng còn trong kho:</span>
                        <span className="ml-2 font-semibold">{stats?.medicineStockRate || 0}%</span>
                    </div>
                    <div>
                        <span className="text-blue-200">Tổng số người dùng:</span>
                        <span className="ml-2 font-semibold">{stats?.totalUsers || 0}</span>
                    </div>
                </div>
            </div>

            {/* Primary Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <RevenueCard
                    title="Tổng doanh thu"
                    amount={stats?.totalRevenue || 0}
                    icon={<FaDollarSign className="h-6 w-6 text-white" />}
                    color="bg-green-500"
                    trend="up"
                    trendValue={12.5}
                />

                <RevenueCard
                    title="Đã thanh toán"
                    amount={stats?.paidTotal || 0}
                    icon={<FaCheckCircle className="h-6 w-6 text-white" />}
                    color="bg-blue-500"
                    trend="up"
                    trendValue={8.3}
                />

                <RevenueCard
                    title="Chờ thanh toán"
                    amount={stats?.pendingTotal || 0}
                    icon={<FaClock className="h-6 w-6 text-white" />}
                    color="bg-orange-500"
                    trend="down"
                    trendValue={3.2}
                />

                <RevenueCard
                    title="Tổng đơn hàng"
                    amount={stats?.totalOrders || 0}
                    icon={<FaShoppingCart className="h-6 w-6 text-white" />}
                    color="bg-purple-500"
                    trend="up"
                    trendValue={15.7}
                    isCount={true}
                />
            </div>

            {/* Secondary Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng người dùng</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {stats?.adminUsers || 0} quản trị viên, {stats?.sellerUsers || 0} người bán
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                            <FaUsers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng thuốc</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalMedicines || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {stats?.inStockMedicines || 0} còn trong kho
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/50">
                            <FaPills className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quảng cáo</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalAds || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {stats?.approvedAds || 0} đã duyệt
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/50">
                            <FaChartLine className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tháng này</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.currentMonthOrders || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                ${(stats?.currentMonthRevenue || 0).toFixed(2)} doanh thu
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                            <FaDollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Tổng quan đơn hàng
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Đơn hàng hoàn thành</span>
                            <span className="font-semibold text-green-600">{stats?.completedOrders || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Đơn hàng đang chờ</span>
                            <span className="font-semibold text-orange-600">{stats?.pendingOrders || 0}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${stats?.totalOrders > 0 ? ((stats?.completedOrders || 0) / stats.totalOrders) * 100 : 0}%`
                                }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stats?.orderSuccessRate || 0}% tỷ lệ hoàn thành
                        </p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Hoạt động gần đây
                    </h3>
                    <div className="space-y-3">
                        {stats?.recentActivities?.length > 0 ? (
                            stats.recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center p-3 rounded-lg ${activity.status === 'paid'
                                        ? 'bg-green-50 dark:bg-green-900/20'
                                        : 'bg-orange-50 dark:bg-orange-900/20'
                                        }`}
                                >
                                    {activity.status === 'paid' ? (
                                        <FaCheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                                    ) : (
                                        <FaClock className="h-4 w-4 text-orange-600 mr-3 flex-shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                            {activity.message}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {activity.customer && `bởi ${activity.customer}`}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <FaChartLine className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Không có hoạt động gần đây</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* System Health Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tổng quan sức khỏe hệ thống
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                            {stats?.orderSuccessRate || 0}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Tỷ lệ đơn hàng thành công</div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${stats?.orderSuccessRate || 0}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                            {stats?.medicineStockRate || 0}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Tỷ lệ thuốc trong kho</div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${stats?.medicineStockRate || 0}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                            {stats?.totalAds > 0 ? ((stats?.approvedAds || 0) / stats.totalAds * 100).toFixed(1) : 0}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Tỷ lệ duyệt quảng cáo</div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${stats?.totalAds > 0 ? ((stats?.approvedAds || 0) / stats.totalAds * 100) : 0}%`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Thao tác nhanh
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-center transition-colors group">
                        <FaShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Xem đơn hàng</span>
                    </button>
                    <button className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg text-center transition-colors group">
                        <FaDollarSign className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">Thanh toán</span>
                    </button>
                    <button className="p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg text-center transition-colors group">
                        <FaUsers className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Quản lý người dùng</span>
                    </button>
                    <button className="p-4 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg text-center transition-colors group">
                        <FaChartLine className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Báo cáo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
