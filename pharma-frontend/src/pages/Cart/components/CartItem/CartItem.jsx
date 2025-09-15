import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, getDiscountedPrice }) => {
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > item.stockQuantity) {
            return;
        }
        onUpdateQuantity(item._id, newQuantity);
    };

    const itemPrice = getDiscountedPrice(item.pricePerUnit, item.discount || 0);
    const totalPrice = itemPrice * item.quantity;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Medicine Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                        <img
                            src={item.imageUrls || 'https://via.placeholder.com/80x80?text=Medicine'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.genericName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                {item.companyName}
                            </p>
                            <div className="flex items-center mt-1">
                                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                                    {item.categoryName}
                                </span>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                    {item.unit}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Giá mỗi đơn vị</p>
                    <div className="flex flex-col">
                        {item.discount > 0 ? (
                            <>
                                <span className="text-sm line-through text-gray-400">
                                    ${item.pricePerUnit.toFixed(2)}
                                </span>
                                <span className="text-lg font-semibold text-green-600">
                                    ${itemPrice.toFixed(2)}
                                </span>
                                <span className="text-xs text-red-500">
                                   Giảm {item.discount}% 
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                ${itemPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Số lượng</p>
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="px-4 py-2 text-center min-w-[3rem] text-gray-900 dark:text-white">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            disabled={item.quantity >= item.stockQuantity}
                            className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaPlus className="w-3 h-3" />
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        Stock: {item.stockQuantity}
                    </p>
                </div>

                {/* Total Price */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tổng cộng</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ${totalPrice.toFixed(2)}
                    </p>
                </div>

                {/* Remove Button */}
                <div className="flex flex-col items-center">
                    <button
                        onClick={() => onRemoveItem(item._id)}
                        className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors"
                        title="Xóa khỏi giỏ hàng"
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
