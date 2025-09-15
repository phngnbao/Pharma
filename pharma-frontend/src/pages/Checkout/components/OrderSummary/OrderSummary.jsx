import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const OrderSummary = ({ cartItems, getDiscountedPrice }) => {
    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => {
        const itemPrice = getDiscountedPrice(item.pricePerUnit, item.discount || 0);
        return total + (itemPrice * item.quantity);
    }, 0);

    const totalDiscount = cartItems.reduce((total, item) => {
        if (item.discount > 0) {
            const originalPrice = item.pricePerUnit * item.quantity;
            const discountedPrice = getDiscountedPrice(item.pricePerUnit, item.discount) * item.quantity;
            return total + (originalPrice - discountedPrice);
        }
        return total;
    }, 0);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Tax calculation (8% tax)
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;

    // Shipping calculation
    const shippingCost = subtotal >= 50 ? 0 : 5.99;
    const finalTotal = grandTotal + shippingCost;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FaShoppingCart className="mr-2" />
                Tóm tắt đơn hàng
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
                {cartItems.map((item) => {
                    const itemPrice = getDiscountedPrice(item.pricePerUnit, item.discount || 0);
                    const itemTotal = itemPrice * item.quantity;

                    return (
                        <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={item.imageUrls || 'https://via.placeholder.com/50x50?text=Medicine'}
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {item.companyName} • {item.unit}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                {item.discount > 0 ? (
                                    <div>
                                        <p className="text-sm line-through text-gray-400">
                                            ${(item.pricePerUnit * item.quantity).toFixed(2)}
                                        </p>
                                        <p className="text-sm font-semibold text-green-600">
                                            ${itemTotal.toFixed(2)}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        ${itemTotal.toFixed(2)}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                        Số tiền trước khi giảm giá ({totalItems} items)
                    </span>
                    <span className="text-gray-900 dark:text-white">
                        VND{(subtotal + totalDiscount).toFixed(2)}
                    </span>
                </div>

                {totalDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-green-600">Discount</span>
                        <span className="text-green-600">
                            -${totalDiscount.toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                        Số tiền sau khi giảm giá
                    </span>
                    <span className="text-gray-900 dark:text-white">
                        VND{subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                        Phí ship
                    </span>
                    <span className={`${shippingCost === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                        Thuế (8%)
                    </span>
                    <span className="text-gray-900 dark:text-white">
                        VND{tax.toFixed(2)}
                    </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            Tổng cộng
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            VND{finalTotal.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Free Shipping Notice */}
            {subtotal < 100000 && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        Thêm {(100000 - subtotal).toFixed(2)}VND nữa để có freeship!
                    </p>
                </div>
            )}

            {/* Security Notice */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                    <span className="mr-1">🔒</span>
                    Thanh toán của bạn được bảo mật 
                </p>
            </div>
        </div>
    );
};

export default OrderSummary;
