import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaCheckCircle, FaDownload, FaPrint, FaHome, FaShoppingCart } from 'react-icons/fa';
import { pdf } from '@react-pdf/renderer';
import toast from 'react-hot-toast';
import Loading from '../../components/ui/Loading/Loading';
import InvoicePDF from './components/InvoicePDF';
import { useTitle, PAGE_TITLES } from '../../hooks/useTitle';

const Invoice = () => {
    useTitle(PAGE_TITLES.INVOICE);
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        // Get payment data from localStorage
        const savedPayment = localStorage.getItem('lastPayment');
        if (savedPayment) {
            setPaymentData(JSON.parse(savedPayment));
        } else {
            // If no payment data, redirect to home
            toast.error('No payment information found');
            navigate('/');
        }
        setLoading(false);
    }, [navigate]);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        if (!paymentData) {
            toast.error('No invoice data available');
            return;
        }

        setDownloading(true);
        try {
            // Generate PDF blob
            const blob = await pdf(<InvoicePDF paymentData={paymentData} />).toBlob();

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `MediCare-Invoice-${paymentData.id}.pdf`;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(url);

            toast.success('Invoice downloaded successfully!');
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to download invoice. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!paymentData) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        No Invoice Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        We couldn't find any invoice information.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <FaHome className="mr-2" />
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                        <FaCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mb-8 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FaPrint className="mr-2" />
                        Print Invoice
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaDownload className={`mr-2 ${downloading ? 'animate-spin' : ''}`} />
                        {downloading ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                </div>

                {/* Invoice */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                MediCare Pharmacy
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your trusted healthcare partner
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Invoice #</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {paymentData.id}
                            </p>
                        </div>
                    </div>

                    {/* Customer and Payment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Customer Information
                            </h3>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Name:</strong> {paymentData.customer.fullName}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Email:</strong> {paymentData.customer.email}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Phone:</strong> {paymentData.customer.phone}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Address:</strong> {paymentData.customer.address}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {paymentData.customer.city}, {paymentData.customer.state} {paymentData.customer.zipCode}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Payment Information
                            </h3>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Payment Method:</strong> {paymentData.paymentMethod.type.toUpperCase()} ending in {paymentData.paymentMethod.last4}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Transaction ID:</strong> {paymentData.id}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Date:</strong> {new Date(paymentData.created).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Status:</strong> <span className="text-green-600 font-semibold">PAID</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Order Items
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Item</th>
                                        <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Company</th>
                                        <th className="px-4 py-3 text-center text-gray-900 dark:text-white">Qty</th>
                                        <th className="px-4 py-3 text-right text-gray-900 dark:text-white">Price</th>
                                        <th className="px-4 py-3 text-right text-gray-900 dark:text-white">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                    {paymentData.items.map((item) => {
                                        const itemPrice = item.discount > 0
                                            ? item.pricePerUnit - (item.pricePerUnit * item.discount / 100)
                                            : item.pricePerUnit;
                                        const itemTotal = itemPrice * item.quantity;

                                        return (
                                            <tr key={item.id}>
                                                <td className="px-4 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-gray-500 dark:text-gray-400">
                                                            {item.genericName} • {item.massUnit}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                                                    {item.company}
                                                </td>
                                                <td className="px-4 py-4 text-center text-gray-600 dark:text-gray-400">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-4 py-4 text-right text-gray-600 dark:text-gray-400">
                                                    ${itemPrice.toFixed(2)}
                                                    {item.discount > 0 && (
                                                        <span className="text-green-600 text-xs ml-1">
                                                            ({item.discount}% off)
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-right text-gray-900 dark:text-white font-semibold">
                                                    ${itemTotal.toFixed(2)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                        <div className="flex justify-end">
                            <div className="w-64 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                    <span className="text-gray-900 dark:text-white">${(paymentData.amount - (paymentData.amount * 0.08) - (paymentData.amount < 50 ? 5.99 : 0)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Tax (8%):</span>
                                    <span className="text-gray-900 dark:text-white">${(paymentData.amount * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {paymentData.amount < 50 ? '$5.99' : 'FREE'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-600 pt-2">
                                    <span className="text-gray-900 dark:text-white">Total:</span>
                                    <span className="text-gray-900 dark:text-white">${paymentData.amount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-center space-x-4 print:hidden">
                    <Link
                        to="/"
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FaHome className="mr-2" />
                        Go to Home
                    </Link>
                    <Link
                        to="/shop"
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <FaShoppingCart className="mr-2" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
