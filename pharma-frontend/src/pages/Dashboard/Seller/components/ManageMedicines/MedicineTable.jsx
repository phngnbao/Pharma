import React from 'react';
import { FaEdit, FaTrash, FaEye, FaPills } from 'react-icons/fa';
import Loading from '../../../../../components/ui/Loading/Loading';

const MedicineTable = ({ medicines, onEditMedicine, onDeleteMedicine, onViewMedicine, loading }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'inactive':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'pending':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Hàng Hóa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Danh Mục
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Nhà Cung Cấp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Giá
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Lượng Hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Trạng Thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Hành Động
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {medicines?.map((medicine) => (
                        <tr key={medicine._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img
                                        src={medicine.imageUrls || 'https://via.placeholder.com/60x60?text=Med'}
                                        alt={medicine.name}
                                        className="h-12 w-12 rounded-lg object-cover"
                                    />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {medicine.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {medicine.genericName}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {medicine.unit}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {medicine.categoryName}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                    {medicine.companyName}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-gray-900 dark:text-white">
                                    ${medicine?.pricePerUnit?.toFixed(2)}
                                </div>
                                {medicine.discount > 0 && (
                                    <div className="text-xs text-red-500">
                                        {medicine?.discount}% OFF
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                    {medicine.stockQuantity} units
                                </div>
                                {medicine.stockQuantity < 10 && (
                                    <div className="text-xs text-red-500">
                                        Low stock!
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(medicine?.status)}`}>
                                    {medicine?.status?.charAt(0).toUpperCase() + medicine?.status?.slice(1)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onViewMedicine(medicine)}
                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                                        title="Xem chi tiết"
                                    >
                                        <FaEye className="h-4 w-4" />
                                    </button>

                                    <button
                                        onClick={() => onEditMedicine(medicine)}
                                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-100 dark:hover:bg-green-900"
                                        title="Chỉnh sửa"
                                    >
                                        <FaEdit className="h-4 w-4" />
                                    </button>

                                    <button
                                        onClick={() => onDeleteMedicine(medicine._id)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                                        title="Xóa"
                                    >
                                        <FaTrash className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {medicines.length === 0 && (
                <div className="text-center py-8">
                    <FaPills className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No medicines found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Add your first medicine to get started</p>
                </div>
            )}
        </div>
    );
};

export default MedicineTable;
