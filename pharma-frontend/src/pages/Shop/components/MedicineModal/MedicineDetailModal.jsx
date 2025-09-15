import React from 'react';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import addToCart from '../../../../utils/addToCart';

const MedicineDetailModal = ({
    isOpen,
    medicine,
    onClose,
    getDiscountedPrice
}) => {
    if (!isOpen || !medicine) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 -z-1 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Chi tiết thuốc
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                                <img
                                    src={medicine.imageUrls}
                                    alt={medicine.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {medicine.name}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Generic: {medicine.genericName}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hãng</p>
                                    <p className="text-gray-900 dark:text-white">{medicine.companyName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Danh mục</p>
                                    <p className="text-gray-900 dark:text-white capitalize">{medicine.categoryName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Đơn vị</p>
                                    <p className="text-gray-900 dark:text-white">{medicine.unit}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Số lượng</p>
                                    <p className="text-gray-900 dark:text-white">{medicine.stockQuantity} đơn vị</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Giá</p>
                                {medicine.discount > 0 ? (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg line-through text-gray-400">
                                            ${medicine.pricePerUnit.toFixed(2)}
                                        </span>
                                        <span className="text-xl font-semibold text-green-600">
                                            ${getDiscountedPrice(medicine.pricePerUnit, medicine.discount).toFixed(2)}
                                        </span>
                                        <span className="text-sm text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                                           giảm {medicine.discount}% 
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                        ${medicine.pricePerUnit.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mô tả</p>
                                <p className="text-gray-900 dark:text-white">{medicine.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={() => {
                                addToCart(medicine);
                                onClose();
                            }}
                            disabled={!medicine.inStock || medicine.stockQuantity === 0}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaShoppingCart className="mr-2" />
                            Thêm vào giỏ
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetailModal;
