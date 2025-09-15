import React from 'react';
import { FaEye, FaShoppingCart, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import addToCart from '../../../../utils/addToCart';

const MedicineTable = ({ medicines, onViewDetails, getDiscountedPrice }) => {
    const navigate = useNavigate();


    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Tên thuốc
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Hãng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Danh mục
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Đơn vị
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Số lượng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {medicines.map((medicine) => (
                            <tr key={medicine._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {medicine.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {medicine.genericName}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {medicine.companyName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {medicine.categoryName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {medicine.unit}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        {medicine.discount > 0 ? (
                                            <>
                                                <span className="line-through text-gray-400">
                                                    ${medicine.pricePerUnit.toFixed(2)}
                                                </span>
                                                <span className="ml-2 text-green-600 font-semibold">
                                                    ${getDiscountedPrice(medicine.pricePerUnit, medicine.discount).toFixed(2)}
                                                </span>
                                                <span className="ml-1 text-xs text-red-500">
                                                   giảm ({medicine.discount}%)
                                                </span>
                                            </>
                                        ) : (
                                            <span>${medicine.pricePerUnit.toFixed(2)}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${medicine.inStock && medicine.stockQuantity > 0
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                        {medicine.inStock && medicine.stockQuantity > 0
                                            ? `Còn hàng (${medicine.stockQuantity})`
                                            : 'Hết hàng'
                                        }
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onViewDetails(medicine)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
                                            title="Xem nhanh"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/medicine/${medicine._id}`)}
                                            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900"
                                            title="Xem chi tiết"
                                        >
                                            <FaExternalLinkAlt />
                                        </button>
                                        <button
                                            onClick={() => addToCart(medicine)}
                                            disabled={!medicine.inStock || medicine.stockQuantity === 0}
                                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Thêm vào giỏ hàng"
                                        >
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicineTable;
