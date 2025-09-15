import React, { useState, useMemo } from 'react';
import { FaDollarSign, FaCheck, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const PaymentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch payments with TanStack Query
    const {
        data: paymentsData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['admin-payments', currentPage, statusFilter],
        queryFn: async () => {
            const response = await axiosSecure.get(`/admin/payments?page=${currentPage}&limit=10&status=${statusFilter}`);
            return response.data;
        },
        keepPreviousData: true,
    });

    // Accept payment mutation
    const acceptPaymentMutation = useMutation({
        mutationFn: async (paymentId) => {
            const response = await axiosSecure.patch(`/admin/payments/${paymentId}/accept`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-payments']);
            toast.success('Payment accepted successfully');
        },
        onError: (error) => {
            console.error('Error accepting payment:', error);
            toast.error(error.response?.data?.message || 'Failed to accept payment');
        },
    });

    // Handle accept payment
    const handleAcceptPayment = async (paymentId) => {
        try {
            await acceptPaymentMutation.mutateAsync(paymentId);
        } catch {
            // Error is handled in mutation onError
        }
    };

    // Filter payments based on search term (client-side filtering)
    const filteredPayments = useMemo(() => {
        if (!paymentsData?.payments) return [];

        let filtered = paymentsData.payments;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(payment =>
                payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (payment.sellerEmails && payment.sellerEmails.some(email =>
                    email.toLowerCase().includes(searchTerm.toLowerCase())
                ))
            );
        }

        return filtered;
    }, [paymentsData?.payments, searchTerm]);

    // Get payment statistics
    const stats = paymentsData?.stats || {
        totalAmount: 0,
        paidAmount: 0,
        pendingAmount: 0,
        totalCount: 0,
        paidCount: 0,
        pendingCount: 0
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Error loading payments: {error.message}</p>
                    <button
                        onClick={() => refetch()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Payment Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage and approve payment transactions
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaDollarSign className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaCheck className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Paid Amount</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.paidAmount.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">({stats.paidCount} payments)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaClock className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Amount</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.pendingAmount.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">({stats.pendingCount} payments)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold">%</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.totalCount > 0 ? ((stats.paidCount / stats.totalCount) * 100).toFixed(1) : 0}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search by Order ID, buyer, or seller email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="md:w-48">
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1); // Reset to first page when filter changes
                                }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Payments ({filteredPayments.length})
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Order Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Buyer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Seller(s)
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
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {payment.orderId}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {payment.medicines}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {payment.buyerName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {payment.buyerEmail}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            {payment.sellerNames && payment.sellerNames.length > 0 ? (
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {payment.sellerNames.slice(0, 2).join(', ')}
                                                    {payment.sellerNames.length > 2 && ` +${payment.sellerNames.length - 2} more`}
                                                </div>
                                            ) : (
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Multiple Sellers
                                                </div>
                                            )}
                                            {payment.sellerEmails && payment.sellerEmails.length > 0 && (
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {payment.sellerEmails[0]}
                                                    {payment.sellerEmails.length > 1 && ` +${payment.sellerEmails.length - 1} more`}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                                            ${payment.amount.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {payment.paymentMethod}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${payment.status === 'paid'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                            }`}>
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <div>
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </div>
                                        {payment.paidAt && (
                                            <div className="text-xs text-green-600">
                                                Paid: {new Date(payment.paidAt).toLocaleDateString()}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {payment.status === 'pending' && (
                                            <button
                                                onClick={() => handleAcceptPayment(payment.id)}
                                                disabled={acceptPaymentMutation.isLoading}
                                                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-xs disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            >
                                                {acceptPaymentMutation.isLoading ? 'Processing...' : 'Accept Payment'}
                                            </button>
                                        )}
                                        {payment.status === 'paid' && (
                                            <span className="text-green-600 text-xs">✓ Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredPayments.length === 0 && (
                        <div className="text-center py-8">
                            <FaDollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No payments found</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {paymentsData?.pagination && paymentsData.pagination.totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Showing page {paymentsData.pagination.currentPage} of {paymentsData.pagination.totalPages}
                                ({paymentsData.pagination.totalCount} total payments)
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={!paymentsData.pagination.hasPrev}
                                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded dark:bg-blue-900 dark:text-blue-300">
                                    {currentPage}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    disabled={!paymentsData.pagination.hasNext}
                                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentManagement;
