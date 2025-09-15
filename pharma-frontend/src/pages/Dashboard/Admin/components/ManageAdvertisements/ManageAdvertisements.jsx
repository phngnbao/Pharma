import React, { useState, useMemo } from 'react';
import {
    FaSearch,
    FaFilter,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaBullhorn,
    FaCalendarAlt,
    FaEye,
    FaCheck,
    FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import Loading from '../../../../../components/ui/Loading/Loading';
import ErrorDataFetching from '../../../../../components/ui/Error/ErrorDataFetching';
import CloudinaryImage from '../../../../../components/ui/CloudinaryImage/CloudinaryImage';

const ManageAdvertisements = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Fetch all advertisement requests
    const { data: advertiseRequests, isLoading, error, refetch } = useQuery({
        queryKey: ['admin-advertise-requests'],
        queryFn: async () => {
            const response = await axiosSecure.get('/advertise-requests');
            return response.data;
        }
    });

    // Update advertisement status mutation
    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const response = await axiosSecure.patch(`/advertise-requests/${id}/status`, { status });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-advertise-requests']);
            toast.success('Trạng thái quảng cáo đã được cập nhật');
            setShowDetailsModal(false);
        },
        onError: (error) => {
            console.error('Error updating advertisement status:', error);
            toast.error('Không thể cập nhật trạng thái quảng cáo');
        }
    });

    // Filter requests based on search and filters
    const filteredRequests = useMemo(() => {
        if (!advertiseRequests) return [];

        return advertiseRequests.filter(request => {
            const matchesSearch =
                request.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.medicineName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.sellerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request._id?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [advertiseRequests, searchTerm, statusFilter]);

    // Calculate summary stats
    const summaryStats = useMemo(() => {
        if (!advertiseRequests) return {
            totalRequests: 0,
            pendingRequests: 0,
            approvedRequests: 0,
            rejectedRequests: 0
        };

        const pending = advertiseRequests.filter(r => r.status === 'pending');
        const approved = advertiseRequests.filter(r => r.status === 'approved');
        const rejected = advertiseRequests.filter(r => r.status === 'rejected');

        return {
            totalRequests: advertiseRequests.length,
            pendingRequests: pending.length,
            approvedRequests: approved.length,
            rejectedRequests: rejected.length
        };
    }, [advertiseRequests]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <FaCheckCircle className="text-green-500 dark:text-green-400" />;
            case 'pending':
                return <FaClock className="text-yellow-500 dark:text-yellow-400" />;
            case 'rejected':
                return <FaTimesCircle className="text-red-500 dark:text-red-400" />;
            default:
                return <FaClock className="text-gray-500 dark:text-gray-400" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Đã duyệt';
            case 'pending':
                return 'Đang chờ';
            case 'rejected':
                return 'Từ chối';
            default:
                return 'Không xác định';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setShowDetailsModal(true);
    };

    const handleUpdateStatus = (id, status) => {
        updateStatusMutation.mutate({ id, status });
    };

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
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Quản lý Quảng cáo
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Duyệt và quản lý các yêu cầu quảng cáo từ người bán
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaBullhorn className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng yêu cầu</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {summaryStats.totalRequests}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                            <FaClock className="text-yellow-600 dark:text-yellow-300" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang chờ duyệt</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {summaryStats.pendingRequests}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-green-600 dark:text-green-300" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã duyệt</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {summaryStats.approvedRequests}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                            <FaTimesCircle className="text-red-600 dark:text-red-300" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã từ chối</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {summaryStats.rejectedRequests}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="relative w-full md:w-1/3">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm quảng cáo..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full md:w-1/4">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="pending">Đang chờ</option>
                            <option value="approved">Đã duyệt</option>
                            <option value="rejected">Đã từ chối</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Advertisement Requests Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Yêu cầu quảng cáo ({filteredRequests.length})
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Tiêu đề
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Người bán
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Ngày gửi
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((request) => (
                                    <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                                                    {request.image ? (
                                                        <CloudinaryImage
                                                            src={request.image}
                                                            alt={request.title}
                                                            className="h-10 w-10 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                            <FaBullhorn className="text-gray-500 dark:text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {request.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {request.medicineName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">{request.sellerEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="mr-2 text-gray-400" />
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(request.submittedAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(request.status)}`}>
                                                {getStatusIcon(request.status)}
                                                <span className="ml-1">{getStatusText(request.status)}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleViewDetails(request)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                            >
                                                <FaEye className="inline mr-1" /> Xem
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        Không tìm thấy yêu cầu quảng cáo nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Advertisement Details Modal */}
            {showDetailsModal && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Chi tiết quảng cáo
                            </h2>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        {selectedRequest.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {selectedRequest.description || 'Không có mô tả'}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">ID:</p>
                                    <p className="text-gray-900 dark:text-white">{selectedRequest._id}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Người bán:</p>
                                    <p className="text-gray-900 dark:text-white">{selectedRequest.sellerEmail}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sản phẩm:</p>
                                    <p className="text-gray-900 dark:text-white">{selectedRequest.medicineName}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ngày gửi:</p>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(selectedRequest.submittedAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Trạng thái:</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(selectedRequest.status)}`}>
                                        {getStatusIcon(selectedRequest.status)}
                                        <span className="ml-1">{getStatusText(selectedRequest.status)}</span>
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Hình ảnh quảng cáo:</p>
                                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                        {selectedRequest.image ? (
                                            <CloudinaryImage
                                                src={selectedRequest.image}
                                                alt={selectedRequest.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <FaBullhorn className="text-gray-500 dark:text-gray-400 h-12 w-12" />
                                                <p className="text-gray-500 dark:text-gray-400 ml-2">Không có hình ảnh</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectedRequest.status === 'pending' && (
                                    <div className="mt-6">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Cập nhật trạng thái:</p>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleUpdateStatus(selectedRequest._id, 'approved')}
                                                disabled={updateStatusMutation.isLoading}
                                                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <FaCheck className="mr-2" />
                                                Duyệt
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(selectedRequest._id, 'rejected')}
                                                disabled={updateStatusMutation.isLoading}
                                                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <FaTimes className="mr-2" />
                                                Từ chối
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAdvertisements;