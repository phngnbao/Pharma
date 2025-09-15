import React, { useState, useMemo } from 'react';
import { FaChartBar, FaDollarSign, FaShoppingCart, FaCalendarAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import DateRangeFilter from './DateRangeFilter';
import ReportTable from './ReportTable';
import ExportButtons from './ExportButtons';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const SalesReport = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();

    // Fetch sales report data
    const {
        data: salesReportData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['admin-sales-report', currentPage, startDate, endDate],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '50'
            });

            if (startDate) {
                params.append('startDate', startDate.toISOString());
            }
            if (endDate) {
                params.append('endDate', endDate.toISOString());
            }

            const response = await axiosSecure.get(`/api/admin/sales-report?${params}`);
            return response.data;
        },
        keepPreviousData: true,
    });

    // Fetch sales statistics
    const {
        data: salesStats,
        isLoading: statsLoading
    } = useQuery({
        queryKey: ['admin-sales-stats'],
        queryFn: async () => {
            const response = await axiosSecure.get('/api/admin/sales-stats?period=month');
            return response.data;
        },
    });

    // Handle date range clear
    const handleClearDateFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setCurrentPage(1);
    };

    // Handle date changes
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setCurrentPage(1);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setCurrentPage(1);
    };

    // Get current filtered data for export
    const exportData = useMemo(() => {
        if (!salesReportData?.salesData) return [];

        return salesReportData.salesData.map(item => ({
            orderId: item.orderId,
            medicineName: item.medicineName,
            medicineCategory: item.medicineCategory,
            sellerName: item.sellerName,
            sellerEmail: item.sellerEmail,
            buyerName: item.buyerName,
            buyerEmail: item.buyerEmail,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            saleDate: item.saleDate,
            status: item.status
        }));
    }, [salesReportData?.salesData]);

    // Generate filename for exports
    const getExportFilename = () => {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        let filename = `sales-report-${dateStr}`;

        if (startDate && endDate) {
            const startStr = startDate.toISOString().split('T')[0];
            const endStr = endDate.toISOString().split('T')[0];
            filename = `sales-report-${startStr}-to-${endStr}`;
        }

        return filename;
    };

    // Get statistics from current data or fallback to general stats
    const currentStats = salesReportData?.stats || salesStats || {
        totalRevenue: 0,
        totalOrders: 0,
        totalQuantity: 0,
        avgOrderValue: 0
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Error loading sales report: {error.message}</p>
                    <button
                        onClick={() => refetch()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sales Report
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Comprehensive sales analytics and reporting
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaDollarSign className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {statsLoading ? 'Loading...' : `$${currentStats.totalRevenue?.toFixed(2) || '0.00'}`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaShoppingCart className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {statsLoading ? 'Loading...' : (currentStats.totalOrders || 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaChartBar className="h-8 w-8 text-purple-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Items Sold</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {statsLoading ? 'Loading...' : (currentStats.totalQuantity || 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaCalendarAlt className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {statsLoading ? 'Loading...' : `$${currentStats.avgOrderValue?.toFixed(2) || '0.00'}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date Range Filter */}
            <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
                onClear={handleClearDateFilter}
            />

            {/* Export Buttons */}
            <ExportButtons
                data={exportData}
                filename={getExportFilename()}
            />

            {/* Report Table */}
            <ReportTable
                data={salesReportData?.salesData || []}
                loading={isLoading}
            />

            {/* Pagination */}
            {salesReportData?.pagination && salesReportData.pagination.totalPages > 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Showing page {salesReportData.pagination.currentPage} of {salesReportData.pagination.totalPages}
                            ({salesReportData.pagination.totalCount} total sales)
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={!salesReportData.pagination.hasPrev}
                                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded dark:bg-blue-900 dark:text-blue-300">
                                {currentPage}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={!salesReportData.pagination.hasNext}
                                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            )}
                </div>
            );
};

            export default SalesReport;
