import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaFilter, FaPills } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import MedicineTable from './MedicineTable';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../api/axiosInstance';
import { useAuth } from '../../../../../hooks/useAuth';
import AddOrEditMedicine from './AddOrEditMedicine';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../../../components/ui/Loading/Loading';

const ManageMedicines = () => {
    const { user } = useAuth();
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMedicine, setEditingMedicine] = useState(null);
    const [viewingMedicine, setViewingMedicine] = useState(null);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    // get medicines
    const { data: medicinesData, isLoading: isMedicinesLoading, refetch: refetchMedicines } = useQuery({
        queryKey: ['medicines'],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axiosInstance.get(`/medicines/seller/${user?.email}`)
            return response.data;
        }
    });

    // get categories
    const { data: categories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axiosInstance.get('/categories');
            return response.data;
        }
    });

    useEffect(() => {
        if (medicinesData) {
            setMedicines(medicinesData);
            setFilteredMedicines(medicinesData);
        }
    }, [medicinesData]);

    // Filter medicines based on search term, category, and status
    useEffect(() => {
        let filtered = medicines;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(medicine =>
                medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(medicine => medicine.category === categoryFilter);
        }

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(medicine => medicine.status === statusFilter);
        }

        setFilteredMedicines(filtered);
    }, [medicines, searchTerm, categoryFilter, statusFilter]);


    // Mutation for adding medicine
    const addMedicineMutation = useMutation({
        mutationFn: async (newMedicine) => {
            const response = await axiosInstance.post('/medicines', newMedicine);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['medicines']);
            toast.success('Medicine added successfully');
        },
        onError: () => {
            toast.error('Failed to add medicine');
        }
    });

    // Mutation for updating medicine
    const updateMedicineMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const response = await axiosInstance.put(`/medicines/${id}`, updatedData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['medicines']);
            toast.success('Medicine updated successfully');
        },
        onError: () => {
            toast.error('Failed to update medicine');
        }
    });

    const onSubmit = async (data) => {
        try {
            if (editingMedicine) {
                // Update existing medicine
                await updateMedicineMutation.mutateAsync({
                    id: editingMedicine._id,
                    updatedData: {
                        ...editingMedicine,
                        ...data,
                        stockQuantity: parseInt(data.stockQuantity),
                        pricePerUnit: parseFloat(data.pricePerUnit),
                        discount: parseFloat(data.discount) || 0,
                    }
                });
            } else {
                // Add new medicine
                await addMedicineMutation.mutateAsync({
                    ...data,
                    stockQuantity: parseInt(data.stockQuantity),
                    pricePerUnit: parseFloat(data.pricePerUnit),
                    discount: parseFloat(data.discount) || 0,
                    createdAt: new Date().toISOString(),
                    seller: {
                        email: user?.email,
                        displayName: user?.displayName || 'Unknown Seller',
                        photoURL: user?.photoURL || ''
                    }
                });
            }

            refetchMedicines();
            setIsModalOpen(false);
            setEditingMedicine(null);
            reset();
        } catch (error) {
            console.error('Lỗi khi lưu hàng hóa:', error);
            toast.error('Hàng hóa không thể được lưu');
        }
    };

    // Handle edit medicine
    const handleEditMedicine = (medicine) => {
        setEditingMedicine(medicine);
        setValue('name', medicine.name);
        setValue('genericName', medicine.genericName);
        setValue('description', medicine.description);
        setValue('image', medicine.image);
        setValue('category', medicine.category);
        setValue('company', medicine.company);
        setValue('massUnit', medicine.massUnit);
        setValue('pricePerUnit', medicine.pricePerUnit);
        setValue('discount', medicine.discount);
        setValue('stockQuantity', medicine.stockQuantity);
        setIsModalOpen(true);
    };

    // Handle delete medicine
    const deleteMedicineMutation = useMutation({
        mutationFn: async (medicineId) => {
            const response = await axiosInstance.delete(`/medicines/${medicineId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] });
            toast.success('Hàng hóa đã được xóa thành công');
        },
        onError: () => {
            toast.error('Hàng hóa không thể được xóa');
        }
    });

    const handleDeleteMedicine = async (medicineId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa hàng hóa này? Hành động này không thể hoàn tác.')) {
            try {
                await deleteMedicineMutation.mutateAsync(medicineId);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Hàng hóa không thể được xóa');
            }
        }
    };

    // Handle view medicine
    const handleViewMedicine = (medicine) => {
        setViewingMedicine(medicine);
    };

    // Close modal and reset form
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMedicine(null);
        reset();
    };

    // Get medicine statistics
    const getMedicineStats = () => {
        const total = medicines.length;
        const active = medicines.filter(m => m.status === 'active').length;
        const pending = medicines.filter(m => m.status === 'pending').length;
        const lowStock = medicines.filter(m => m.stock < 10).length;

        return { total, active, pending, lowStock };
    };

    const stats = getMedicineStats();

    // when data isLoading
    if (isMedicinesLoading || isCategoriesLoading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Quản Lý Hàng Hóa
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Thêm, Sửa, Xóa Hàng Hóa
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Thêm Hàng Hóa
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaPills className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng Hàng Hóa</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">✓</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hàng Hóa Hoạt Động</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-bold text-sm">⏳</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hàng Hóa Chờ</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 font-bold text-sm">⚠</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hàng Hóa Hết</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lowStock}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search medicines..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">Tất Cả Danh Mục</option>
                                {categories?.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">Tất Cả Trạng Thái</option>
                                <option value="active">Hoạt Động</option>
                                <option value="pending">Chờ</option>
                                <option value="inactive">Ngừng Hoạt Động</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Medicines Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Hàng Hóa Của Bạn ({filteredMedicines.length})
                    </h3>
                </div>
                <MedicineTable
                    medicines={filteredMedicines}
                    onEditMedicine={handleEditMedicine}
                    onDeleteMedicine={handleDeleteMedicine}
                    onViewMedicine={handleViewMedicine}
                    loading={isMedicinesLoading}
                />
            </div>

            {/* Add/Edit Medicine Modal */}
            {isModalOpen && <AddOrEditMedicine medicine={editingMedicine} onClose={closeModal} register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} categories={categories} />}

            {/* View Medicine Modal */}
            {viewingMedicine && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Medicine Details
                        </h2>

                        <div className="space-y-4">
                            <img
                                src={viewingMedicine.image || 'https://via.placeholder.com/300x200?text=Medicine'}
                                alt={viewingMedicine.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />

                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                    {viewingMedicine.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {viewingMedicine.genericName}
                                </p>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300">
                                {viewingMedicine.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Category:</span>
                                    <p className="text-gray-900 dark:text-white">{viewingMedicine.category}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Company:</span>
                                    <p className="text-gray-900 dark:text-white">{viewingMedicine.company}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Price:</span>
                                    <p className="text-gray-900 dark:text-white">${viewingMedicine.pricePerUnit}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Stock:</span>
                                    <p className="text-gray-900 dark:text-white">{viewingMedicine.stockQuantity} units</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setViewingMedicine(null)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMedicines;
