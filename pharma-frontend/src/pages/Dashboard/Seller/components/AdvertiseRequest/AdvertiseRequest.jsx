import React, { useState, useMemo, useEffect, use } from 'react';
import {
    FaPlus,
    FaSearch,
    FaFilter,
    FaEye,
    FaEdit,
    FaTrash,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaBullhorn,
    FaCalendarAlt,
    FaDollarSign
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../../../../api/axiosInstance';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../../../hooks/useAuth';
import Loading from '../../../../../components/ui/Loading/Loading';
import CloudinaryImage from '../../../../../components/ui/CloudinaryImage/CloudinaryImage';

const AdvertiseRequest = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // fetch medicines using tanstack query
    const { data: medicines, isLoading: isMedicinesLoading } = useQuery({
        queryKey: ['medicines', user?.email],
        queryFn: async () => {
            const response = await axiosInstance.get(`/medicines/seller/${user?.email}`);
            return response.data;
        }
    });

    // fetch advertisement requests using tanstack query
    const { data: advertiseRequests, isLoading: isAdvertiseLoading } = useQuery({
        queryKey: ['advertise-requests', user?.email],
        queryFn: async () => {
            const response = await axiosInstance.get(`/advertise-requests/seller/${user?.email}`);
            return response.data;
        }
    });

    // Filter requests based on search and filters
    const filteredRequests = useMemo(() => {
        if (!advertiseRequests) return [];

        return advertiseRequests.filter(request => {
            const matchesSearch =
                request.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.medicineName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request._id?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [advertiseRequests, searchTerm, statusFilter]);

    // Calculate summary stats
    const summaryStats = useMemo(() => {
        if (!advertiseRequests) return {
            totalRequests: 0,
            activeAds: 0,
            pendingRequests: 0,
            approvedRequests: 0,
            totalSpent: 0,
            totalClicks: 0,
            totalConversions: 0
        };

        const active = advertiseRequests.filter(r => r.status === 'active');
        const pending = advertiseRequests.filter(r => r.status === 'pending');
        const approved = advertiseRequests.filter(r => r.status === 'approved');

        return {
            totalRequests: advertiseRequests.length,
            activeAds: active.length,
            pendingRequests: pending.length,
            approvedRequests: approved.length,
            totalSpent: advertiseRequests.reduce((sum, r) => sum + (r.cost || 0), 0),
            totalClicks: advertiseRequests.reduce((sum, r) => sum + (r.clicks || 0), 0),
            totalConversions: advertiseRequests.reduce((sum, r) => sum + (r.conversions || 0), 0)
        };
    }, [advertiseRequests]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
            case 'active':
                return <FaCheckCircle className="text-green-500 dark:text-green-400" />;
            case 'pending':
                return <FaClock className="text-yellow-500 dark:text-yellow-400" />;
            case 'rejected':
                return <FaTimesCircle className="text-red-500 dark:text-red-400" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'approved':
                return `${baseClasses} bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400`;
            case 'active':
                return `${baseClasses} bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400`;
            case 'rejected':
                return `${baseClasses} bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400`;
            default:
                return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300`;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleCreateRequest = () => {
        setSelectedRequest(null);
        setEditMode(false);
        reset();
        setShowRequestModal(true);
    };

    const handleEditRequest = (request) => {
        setSelectedRequest(request);
        setEditMode(true);
        reset({
            medicineId: request.medicineId,
            title: request.title,
            description: request.description,
            duration: request.duration,
            budget: request.budget,
            startDate: request.startDate
        });
        setShowRequestModal(true);
    };

    const handleDeleteRequest = async (requestId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa yêu cầu quảng cáo này không?')) {
            try {
                await axiosInstance.delete(`/advertise-requests/${requestId}`);
                toast.success('Yêu cầu quảng cáo đã được xóa thành công');
                // Invalidate and refetch the advertise requests
                queryClient.invalidateQueries(['advertise-requests', user?.email]);
            } catch (error) {
                console.error('Lỗi khi xóa yêu cầu:', error);
                toast.error('Lỗi khi xóa yêu cầu');
            }
        }
    };

    const onSubmit = async (data) => {
        try {
            const selectedMedicine = medicines?.find(med => med._id === data.medicineId);

            const requestData = {
                medicineId: data.medicineId,
                medicineName: selectedMedicine?.name || '',
                medicineImage: selectedMedicine?.image || '',
                title: data.title,
                description: data.description,
                duration: parseInt(data.duration),
                budget: parseFloat(data.budget),
                startDate: data.startDate,
                endDate: calculateEndDate(data.startDate, data.duration),
                status: 'pending',
                clicks: 0,
                impressions: 0,
                conversions: 0,
                cost: 0,
                sellerEmail: user?.email,
                sellerName: user?.displayName || 'Unknown Seller',
                submittedAt: new Date().toISOString(),
                reviewedAt: null,
                adminNote: null
            };

            if (editMode) {
                await axiosInstance.put(`/advertise-requests/${selectedRequest._id}`, requestData);
                toast.success('Yêu cầu quảng cáo đã được cập nhật thành công');
            } else {
                await axiosInstance.post('/advertise-requests', requestData);
                toast.success('Yêu cầu quảng cáo đã được gửi thành công');
            }

            // Invalidate and refetch the advertise requests
            queryClient.invalidateQueries(['advertise-requests', user?.email]);

            setShowRequestModal(false);
            reset();
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            toast.error('Lỗi khi gửi yêu cầu');
        }
    };

    const calculateEndDate = (startDate, duration) => {
        if (!startDate || !duration) return '';
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + parseInt(duration));
        return end.toISOString().split('T')[0];
    };


    // data is loading
    if (isMedicinesLoading || isAdvertiseLoading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{summaryStats.totalRequests}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <FaBullhorn className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Ads</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{summaryStats.activeAds}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <FaCheckCircle className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Clicks</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{summaryStats.totalClicks.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <FaEye className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">${summaryStats.totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                            <FaDollarSign className="text-red-600 dark:text-red-400" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by title, medicine, or request ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="all">Tất Cả Trạng Thái</option>
                            <option value="active">Hoạt Động</option>
                            <option value="approved">Duyệt</option>
                            <option value="pending">Chờ Duyệt</option>
                            <option value="rejected">Từ Chối</option>
                        </select>
                    </div>

                    <button
                        onClick={handleCreateRequest}
                        className="flex items-center space-x-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                    >
                        <FaPlus />
                        <span>Tạo Yêu Cầu Mới</span>
                    </button>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Yêu Cầu Quảng Cáo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Thời Gian & Ngân Hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Hiệu Suất
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Trạng Thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Hành Động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredRequests?.map((request) => (
                                <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4">
                                        <div className="flex items-start space-x-3">
                                            <CloudinaryImage
                                                src={request.medicineImage || 'https://via.placeholder.com/64x64?text=Med'}
                                                alt={request.medicineName}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{request.title}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{request.medicineName}</p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">{request.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{request.duration} days</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">${request.budget} budget</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                {formatDate(request.startDate)} - {formatDate(request.endDate)}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm text-gray-900 dark:text-white">{(request.clicks || 0).toLocaleString()} clicks</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{(request.impressions || 0).toLocaleString()} impressions</p>
                                            <p className="text-xs text-green-600 dark:text-green-400">{request.conversions || 0} conversions</p>
                                            <p className="text-xs text-red-500 dark:text-red-400">${(request.cost || 0).toFixed(2)} spent</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(request.status)}
                                            <span className={getStatusBadge(request.status)}>
                                                {request.status?.charAt(0).toUpperCase() + request.status?.slice(1)}
                                            </span>
                                        </div>
                                        {request.adminNote && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs truncate" title={request.adminNote}>
                                                {request.adminNote}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditRequest(request)}
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                                                disabled={request.status === 'active'}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRequest(request._id)}
                                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                                disabled={request.status === 'active'}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!filteredRequests || filteredRequests.length === 0) && (
                    <div className="text-center py-12">
                        <FaBullhorn className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No advertisement requests found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first advertisement request to promote your medicines.</p>
                        <button
                            onClick={handleCreateRequest}
                            className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                        >
                            Tạo Yêu Cầu Quảng Cáo Mới
                        </button>
                    </div>
                )}
            </div>

            {/* Request Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {editMode ? 'Edit Advertisement Request' : 'Create Advertisement Request'}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowRequestModal(false)}
                                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <FaTimesCircle size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Medicine Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Select Medicine *
                                    </label>
                                    <select
                                        {...register('medicineId', { required: 'Please select a medicine' })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">Choose a medicine...</option>
                                        {medicines?.map(medicine => (
                                            <option key={medicine._id} value={medicine._id}>
                                                {medicine.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.medicineId && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.medicineId.message}</p>
                                    )}
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Advertisement Title *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('title', {
                                            required: 'Title is required',
                                            minLength: { value: 10, message: 'Title must be at least 10 characters' }
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="Enter a compelling title for your advertisement"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.title.message}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description *
                                    </label>
                                    <textarea
                                        {...register('description', {
                                            required: 'Description is required',
                                            minLength: { value: 20, message: 'Description must be at least 20 characters' }
                                        })}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="Describe your medicine and its benefits"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.description.message}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Duration */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Duration (Days) *
                                        </label>
                                        <select
                                            {...register('duration', { required: 'Duration is required' })}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        >
                                            <option value="">Chọn Thời Gian...</option>
                                            <option value="7">7 Ngày</option>
                                            <option value="14">14 Ngày</option>
                                            <option value="21">21 Ngày</option>
                                            <option value="30">30 Ngày</option>
                                            <option value="60">60 Ngày</option>
                                            <option value="90">90 Ngày</option>
                                        </select>
                                        {errors.duration && (
                                            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.duration.message}</p>
                                        )}
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Ngân Hàng ($) *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="10"
                                            {...register('budget', {
                                                required: 'Ngân Hàng là bắt buộc',
                                                min: { value: 10, message: 'Ngân Hàng tối thiểu là 100000000' }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                            placeholder="Nhập Ngân Hàng"
                                        />
                                        {errors.budget && (
                                            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.budget.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Start Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        {...register('startDate', { required: 'Ngày Bắt Đầu là bắt buộc' })}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.startDate && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.startDate.message}</p>
                                    )}
                                </div>

                                {/* Terms Notice */}
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Advertisement Guidelines</h4>
                                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                                        <li>• Quảng Cáo Phải Tuân Thủ Quy Định Quảng Cáo Thuần Thiện</li>
                                        <li>• Nội Dung Sẽ Được Phê Duyệt Bởi Admin Team Trước Khi Duyệt</li>
                                        <li>• Ngân Hàng Sẽ Được Trừ Theo Kỳ Tính Theo Hiệu Suất</li>
                                        <li>• Quảng Cáo Có Thể Dừng Hoặc Sửa Chỉnh Trước Khi Sẽ Bắt Đầu</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setShowRequestModal(false)}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                                >
                                    {editMode ? 'Cập Nhật Yêu Cầu' : 'Gửi Yêu Cầu'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvertiseRequest;
