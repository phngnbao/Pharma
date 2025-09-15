import React from 'react';
import { FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportButtons = ({ data, filename = 'sales-report' }) => {
    // Export to CSV
    const exportToCSV = () => {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${filename}.csv`);
    };

    // Export to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(20);
        doc.text('Sales Report', 14, 22);

        // Add date
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);

        // Prepare table data
        const tableColumns = [
            'Order ID',
            'Medicine',
            'Seller',
            'Buyer',
            'Amount',
            'Date'
        ];

        const tableRows = data.map(item => [
            item.orderId,
            item.medicineName,
            item.sellerEmail,
            item.buyerEmail,
            `$${item.totalPrice.toFixed(2)}`,
            new Date(item.saleDate).toLocaleDateString()
        ]);

        // Add table
        doc.autoTable({
            head: [tableColumns],
            body: tableRows,
            startY: 40,
            styles: {
                fontSize: 8,
                cellPadding: 2
            },
            headStyles: {
                fillColor: [59, 130, 246],
                textColor: 255
            }
        });

        doc.save(`${filename}.pdf`);
    };

    // Convert data to CSV format
    const convertToCSV = (data) => {
        if (!data || data.length === 0) return '';

        const headers = Object.keys(data[0]);
        const csvHeaders = headers.join(',');

        const csvRows = data.map(row =>
            headers.map(header => {
                const value = row[header];
                // Escape commas and quotes in CSV
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        );

        return [csvHeaders, ...csvRows].join('\n');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Export Report
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* CSV Export */}
                <button
                    onClick={exportToCSV}
                    disabled={!data || data.length === 0}
                    className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaDownload className="mr-2 h-4 w-4" />
                    CSV
                </button>

                {/* Excel Export */}
                <button
                    onClick={exportToExcel}
                    disabled={!data || data.length === 0}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaDownload className="mr-2 h-4 w-4" />
                    Excel
                </button>

                {/* PDF Export */}
                <button
                    onClick={exportToPDF}
                    disabled={!data || data.length === 0}
                    className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaDownload className="mr-2 h-4 w-4" />
                    PDF
                </button>

                {/* JSON Export (bonus) */}
                <button
                    onClick={() => {
                        const jsonStr = JSON.stringify(data, null, 2);
                        const blob = new Blob([jsonStr], { type: 'application/json' });
                        saveAs(blob, `${filename}.json`);
                    }}
                    disabled={!data || data.length === 0}
                    className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaDownload className="mr-2 h-4 w-4" />
                    JSON
                </button>
            </div>

            {/* Export Info */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Export Info:</strong> You can export the current filtered report data in multiple formats.
                </p>
                <ul className="text-xs text-blue-600 dark:text-blue-300 mt-2 space-y-1">
                    <li>• <strong>CSV:</strong> Best for spreadsheet applications</li>
                    <li>• <strong>Excel:</strong> Formatted Excel file with proper columns</li>
                    <li>• <strong>PDF:</strong> Professional report format</li>
                    <li>• <strong>JSON:</strong> Raw data for developers</li>
                </ul>
            </div>
        </div>
    );
};

export default ExportButtons;
