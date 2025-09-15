import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axiosInstance from '../../../../../api/axiosInstance';
import Loading from '../../../../../components/ui/Loading/Loading';

const AddOrEditMedicine = ({ medicine, onClose, register, handleSubmit, errors, onSubmit, categories }) => {
    const { data: companies, isLoading: isCompaniesLoading } = useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            const response = await axiosInstance.get('/companies');
            return response.data;
        }
    });

    // when data isLoading
    if (isCompaniesLoading) {
        return <Loading />;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {medicine ? 'Edit Medicine' : 'Add New Medicine'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Medicine Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tên Thuốc *
                            </label>
                            <input
                                type="text"
                                {...register('name', { required: 'Medicine name is required' })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Nhập Tên Thuốc"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Generic Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tên Thuốc Thuần Thiện *
                            </label>
                            <input
                                type="text"
                                {...register('genericName', { required: 'Generic name is required' })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Nhập Tên Thuốc Thuần Thiện"
                            />
                            {errors.genericName && (
                                <p className="text-red-500 text-xs mt-1">{errors.genericName.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Short Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Nhập Mô Tả Thuốc"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Image URL
                        </label>
                        <input
                            type="url"
                            {...register('image')}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Nhập URL Hình Ảnh"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Danh Mục *
                            </label>
                            <select
                                {...register('category', { required: 'Danh Mục Thuốc là bắt buộc' })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">Chọn Danh Mục</option>
                                {categories?.map(category => (
                                    <option key={category._id} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nhà Cung Cấp *
                            </label>
                            <select
                                defaultValue={medicine ? medicine.company : ''}
                                {...register('company', { required: 'Company is required' })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">Chọn Nhà Cung Cấp</option>
                                {companies?.map(company => (
                                    <option key={company?._id} value={company?.name}>
                                        {company?.name}
                                    </option>
                                ))}
                            </select>
                            {errors.company && (
                                <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Mass Unit */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Đơn Vị *
                            </label>
                            <input
                                type="text"
                                {...register('massUnit', { required: 'Đơn Vị là bắt buộc' })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="e.g., 500mg, 5ml"
                            />
                            {errors.massUnit && (
                                <p className="text-red-500 text-xs mt-1">{errors.massUnit.message}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Giá Thuốc ($) *
                            </label>
                            <input
                                type="number"
                                defaultValue={medicine ? medicine.pricePerUnit : 0}
                                {...register('pricePerUnit', { required: 'Giá Thuốc là bắt buộc', min: 0 })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="0.00"
                            />
                            {errors.pricePerUnit && (
                                <p className="text-red-500 text-xs mt-1">{errors.pricePerUnit.message}</p>
                            )}
                        </div>

                        {/* Discount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Giảm Giá (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                defaultValue="0"
                                {...register('discount', { min: 0, max: 100 })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="0"
                            />
                            {errors.discount && (
                                <p className="text-red-500 text-xs mt-1">{errors.discount.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Stock */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Số Lượng Hàng Hóa *
                            </label>
                            <input
                                type="number"
                                defaultValue={medicine ? medicine.stockQuantity : 0}
                                {...register('stockQuantity', { required: 'Số Lượng Hàng Hóa là bắt buộc', min: 0 })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter stock quantity"
                            />
                            {errors.stockQuantity && (
                                <p className="text-red-500 text-xs mt-1">{errors.stockQuantity.message}</p>
                            )}
                        </div>
                        {/* Company */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Trạng Thái *
                            </label>
                            <select
                                {...register('status', { required: 'Trạng Thái là bắt buộc' })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="pending">Chờ Duyệt</option>
                                <option value="active">Hoạt Động</option>
                                <option value="inactive">Ngừng Hoạt Động</option>
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {medicine ? 'Cập Nhật' : 'Thêm'} Hàng Hóa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddOrEditMedicine
