import { FaDollarSign, FaPills, FaShoppingCart, FaClock, FaCheckCircle, FaEye } from 'react-icons/fa';
import { useAuth } from '../../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Loading from '../../../../../components/ui/Loading/Loading';

const SellerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    //    get seller statistics from API
    const { data: sellerStats, isLoading } = useQuery({
        queryKey: ['sellerStats', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/seller/stats/${user?.email}`);
            return response.data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-2">
                    Chào mừng trở lại, {user?.displayName || 'Bán hàng'}!
                </h1>
                <p className="text-green-100">
                    Quản lý kho thuốc và theo dõi hiệu suất bán hàng của bạn
                </p>
            </div>

            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Doanh thu tổng cộng
                            </p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                ${sellerStats.totalRevenue.toFixed(2)}
                            </p>
                            {/* <p className="text-sm mt-1 text-green-600">
                                ↗ 12.5% from last month
                            </p> */}
                        </div>
                        <div className="p-3 rounded-full bg-green-500">
                            <FaDollarSign className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Doanh thu đã thanh toán
                            </p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                ${sellerStats.paidTotal.toFixed(2)}
                            </p>
                            {/* <p className="text-sm mt-1 text-blue-600">
                                ↗ 8.3% from last month
                            </p> */}
                        </div>
                        <div className="p-3 rounded-full bg-blue-500">
                            <FaCheckCircle className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Đơn hàng chờ xử lý
                            </p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                ${sellerStats.pendingTotal.toFixed(2)}
                            </p>
                            <p className="text-sm mt-1 text-orange-600">
                                {sellerStats.pendingOrders} đơn hàng chờ xử lý
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-orange-500">
                            <FaClock className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Số lượng thuốc
                            </p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {sellerStats.totalMedicines}
                            </p>
                            <p className="text-sm mt-1 text-purple-600">
                                Số lượng thuốc còn trong kho
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-purple-500">
                            <FaPills className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Tổng quan doanh thu
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Doanh thu</span>
                            <span className="font-semibold text-green-600">{sellerStats.totalSales}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Đơn hàng chờ xử lý</span>
                            <span className="font-semibold text-orange-600">{sellerStats.pendingOrders}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                    width: `${((sellerStats.totalSales - sellerStats.pendingOrders) / sellerStats.totalSales) * 100}%`
                                }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {(((sellerStats.totalSales - sellerStats.pendingOrders) / sellerStats.totalSales) * 100).toFixed(1)}% Tỷ lệ hoàn thành
                        </p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Lịch sử hoạt động
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                            <FaCheckCircle className="h-4 w-4 text-green-600 mr-3" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Đơn hàng mới: Paracetamol - $12.50
                            </span>
                        </div>
                        <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                            <FaShoppingCart className="h-4 w-4 text-blue-600 mr-3" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                3 đơn hàng mới được nhận
                            </span>
                        </div>
                        <div className="flex items-center p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
                            <FaClock className="h-4 w-4 text-orange-600 mr-3" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                2 thanh toán chờ duyệt
                            </span>
                        </div>
                        <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                            <FaEye className="h-4 w-4 text-purple-600 mr-3" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Thuốc được xem 45 lần hôm nay
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly Revenue Chart Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Biểu đồ doanh thu theo tháng
                </h3>
                <div className="grid grid-cols-6 gap-4">
                    {sellerStats?.monthlyRevenue.map((month, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-2">
                                <div
                                    className="bg-blue-600 rounded-sm mx-auto"
                                    style={{
                                        height: `${(month.revenue / 3500) * 80}px`,
                                        width: '20px'
                                    }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{month.month}</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                ${month.revenue}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Hành động nhanh
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-center transition-colors">
                        <FaPills className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-blue-600">Thêm thuốc</span>
                    </button>
                    <button className="p-4 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 rounded-lg text-center transition-colors">
                        <FaDollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-green-600">Xem thanh toán</span>
                    </button>
                    <button className="p-4 bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg text-center transition-colors">
                        <FaEye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-purple-600">Quảng cáo</span>
                    </button>
                    <button className="p-4 bg-orange-50 dark:bg-orange-900 hover:bg-orange-100 dark:hover:bg-orange-800 rounded-lg text-center transition-colors">
                        <FaShoppingCart className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-orange-600">Xem đơn hàng</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;
