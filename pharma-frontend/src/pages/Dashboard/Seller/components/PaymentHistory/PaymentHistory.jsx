import React, { useState, useMemo } from 'react';
import {
    FaSearch,
    FaFilter,
    FaDownload,
    FaEye,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaCalendarAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../../hooks/useAuth';
import Loading from '../../../../../components/ui/Loading/Loading';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const axiosSecure = useAxiosSecure();

    // Fetch seller's payment history directly from backend
    const { data: sellerPayments, isLoading: isLoadingPayments } = useQuery({
        queryKey: ['seller-payments', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/seller/payments/${user?.email}`);
            return response.data.map(payment => ({
                id: payment.orderId,
                orderId: payment.orderId,
                amount: payment.totalAmount,
                commission: payment.commission,
                netAmount: payment.netAmount,
                status: payment.paymentStatus,
                paymentMethod: 'Stripe',
                transactionId: payment.paymentId || 'N/A',
                customerName: payment.buyerName || 'Unknown Customer',
                customerEmail: payment.buyerEmail || 'Unknown Email',
                medicines: payment.sellerItems?.map(item => ({
                    name: item.name || item.medicineName || 'Unknown Medicine',
                    quantity: item.quantity || 1,
                    price: (item.discountPrice * item.quantity) || 0
                })) || [],
                createdAt: payment.createdAt,
                completedAt: payment.createdAt
            }));
        },
        enabled: !!user?.email
    });
    console.log("🚀 ~ PaymentHistory ~ sellerPayments:", sellerPayments)

    // get payment stats data
    const { data: paymentStats, isLoading: isLoadingStats } = useQuery({
        queryKey: ['payment-stats', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/seller/payment-stats/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email
    });

    // Filter payments based on search and filters
    const filteredPayments = useMemo(() => {
        if (!sellerPayments) return [];

        return sellerPayments.filter(payment => {
            const matchesSearch =
                payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;

            const matchesDate = (() => {
                if (dateFilter === 'all') return true;
                const paymentDate = new Date(payment.createdAt);
                const now = new Date();

                switch (dateFilter) {
                    case 'today':
                        return paymentDate.toDateString() === now.toDateString();
                    case 'week': {
                        const weekAgo = new Date(now.setDate(now.getDate() - 7));
                        return paymentDate >= weekAgo;
                    }
                    case 'month': {
                        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                        return paymentDate >= monthAgo;
                    }
                    default:
                        return true;
                }
            })();

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [sellerPayments, searchTerm, statusFilter, dateFilter]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle className="text-green-500 dark:text-green-400" />;
            case 'pending':
                return <FaClock className="text-yellow-500 dark:text-yellow-400" />;
            case 'failed':
                return <FaTimesCircle className="text-red-500 dark:text-red-400" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'completed':
                return `${baseClasses} bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400`;
            case 'failed':
                return `${baseClasses} bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400`;
            default:
                return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300`;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setShowDetailModal(true);
    };

    const handleExportData = () => {
        const csvContent = [
            ['Payment ID', 'Order ID', 'Customer', 'Amount', 'Commission', 'Net Amount', 'Status', 'Date'],
            ...filteredPayments.map(payment => [
                payment.id,
                payment.orderId,
                payment.customerName,
                payment.amount,
                payment.commission,
                payment.netAmount,
                payment.status,
                formatDate(payment.createdAt)
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payment-history.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('Payment history exported successfully');
    };

    // Show loading state
    if (isLoadingPayments || isLoadingStats) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Payments</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{paymentStats?.totalPayments}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Earnings</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">${paymentStats?.totalEarnings?.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <FaCheckCircle className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{paymentStats?.pendingPayments}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                            <FaClock className="text-yellow-600 dark:text-yellow-400" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Commission</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">${paymentStats?.totalCommissions?.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                            <FaTimesCircle className="text-red-600 dark:text-red-400" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by order ID, customer, or transaction..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                            <option value="all">Tất cả</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="pending">Chờ xử lý</option>
                            <option value="failed">Thất bại</option>
                        </select>

                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>

                    <button
                        onClick={handleExportData}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        <FaDownload />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Thông tin thanh toán
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Số tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Ngày
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredPayments?.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">OrderId: {payment?.id?.slice(-6).toUpperCase()}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">TrxId: {payment.transactionId}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{payment.customerName}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{payment.customerEmail}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">${payment?.amount?.toFixed(2)}</p>
                                            <p className="text-xs text-red-500 dark:text-red-400">Commission: ${payment?.commission?.toFixed(2)}</p>
                                            <p className="text-xs text-green-600 dark:text-green-400">Net: ${payment?.netAmount?.toFixed(2)}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(payment.status)}
                                            <span className={getStatusBadge(payment.status)}>
                                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(payment.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleViewDetails(payment)}
                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 flex items-center space-x-1"
                                        >
                                            <FaEye />
                                            <span>Xem chi tiết</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!filteredPayments || filteredPayments.length === 0) && (
                    <div className="text-center py-12">
                        <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payment history found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            {!sellerPayments || sellerPayments.length === 0
                                ? "Bạn chưa nhận được bất kỳ thanh toán nào. Bắt đầu bán thuốc để xem lịch sử thanh toán."
                                : "Không tìm thấy thanh toán nào khớp với tiêu chí tìm kiếm của bạn."
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Payment Detail Modal */}
            {showDetailModal && selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Details</h3>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <FaTimesCircle size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Payment Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment ID</label>
                                        <p className="text-sm text-gray-900 dark:text-white">{selectedPayment.id}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order ID</label>
                                        <p className="text-sm text-gray-900 dark:text-white">{selectedPayment.orderId}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transaction ID</label>
                                        <p className="text-sm text-gray-900 dark:text-white">{selectedPayment.transactionId}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
                                        <p className="text-sm text-gray-900 dark:text-white">{selectedPayment.paymentMethod}</p>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Customer Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                            <p className="text-sm text-gray-900 dark:text-white">{selectedPayment.customerName}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                            <p className="text-sm text-gray-900 dark:text-white">{selectedPayment.customerEmail}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Amount Breakdown */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Amount Breakdown</h4>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount:</span>
                                            <span className="text-sm font-medium dark:text-white">${selectedPayment.amount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Platform Commission:</span>
                                            <span className="text-sm font-medium text-red-600 dark:text-red-400">-${selectedPayment.commission.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">Net Amount:</span>
                                                <span className="text-sm font-bold text-green-600 dark:text-green-400">${selectedPayment.netAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Medicines */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Medicines Ordered</h4>
                                    <div className="space-y-2">
                                        {selectedPayment.medicines.map((medicine, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{medicine.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Quantity: {medicine.quantity}</p>
                                                </div>
                                                <p className="text-sm font-medium dark:text-white">${medicine.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status and Dates */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Status & Timeline</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            {getStatusIcon(selectedPayment.status)}
                                            <span className={getStatusBadge(selectedPayment.status)}>
                                                {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Created: {formatDate(selectedPayment.createdAt)}</p>
                                            {selectedPayment.completedAt && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Completed: {formatDate(selectedPayment.completedAt)}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
