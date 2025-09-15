import { FaCalendarAlt, FaCreditCard, FaEye, FaFilter, FaSearch } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Loading from '../../../../../components/ui/Loading/Loading';

const UserPaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Fetch user's order history
    const { data: userOrders, isLoading } = useQuery({
        queryKey: ['userOrders', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/orders/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email
    });

    // Filter orders based on search and status
    const filteredOrders = userOrders?.filter(order => {
        const matchesSearch = !searchTerm ||
            order._id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.items?.some(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || order.paymentStatus === statusFilter;

        return matchesSearch && matchesStatus;
    }) || [];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'paid':
                return 'px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full';
            case 'pending':
                return 'px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full';
            case 'failed':
                return 'px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full';
            default:
                return 'px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full';
        }
    };

    const handleViewDetails = (order) => {
        // TODO: Implement order details modal
        console.log('View order details:', order);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment History</h2>
                <div className="flex items-center space-x-2">
                    <FaCreditCard className="h-6 w-6 text-blue-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {filteredOrders.length} {filteredOrders.length === 1 ? 'payment' : 'payments'}
                    </span>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by order ID or medicine name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                </div>
                <div className="relative">
                    <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Order Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Items
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredOrders?.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            #{order._id.toString().slice(-6).toUpperCase()}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Payment ID: {order.paymentIntentId?.slice(-8) || 'N/A'}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {order.items?.[0]?.name || 'Medicine'}{order.items?.length > 1 && ` +${order.items.length - 1} more`}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        ${order.orderTotal?.toFixed(2) || '0.00'}
                                    </p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusBadge(order.paymentStatus)}>
                                        {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1) || 'Unknown'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(order.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleViewDetails(order)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 flex items-center space-x-1"
                                    >
                                        <FaEye />
                                        <span>View</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {(!filteredOrders || filteredOrders.length === 0) && (
                <div className="text-center py-12">
                    <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payment history found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        {!userOrders || userOrders.length === 0
                            ? "You haven't made any purchases yet. Start shopping to see payment history."
                            : "No payments found matching your search criteria."
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserPaymentHistory;
