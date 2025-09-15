import React from 'react';
import DataTable from 'react-data-table-component';
import { FaPills, FaDollarSign } from 'react-icons/fa';

const ReportTable = ({ data, loading }) => {
    const columns = [
        {
            name: 'Order ID',
            selector: row => row.orderId,
            sortable: true,
            width: '120px',
            cell: row => (
                <div className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    #{row.orderId}
                </div>
            )
        },
        {
            name: 'Medicine',
            selector: row => row.medicineName,
            sortable: true,
            grow: 2,
            cell: row => (
                <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                        <FaPills className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                            {row.medicineName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {row.medicineCategory}
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Seller',
            selector: row => row.sellerEmail,
            sortable: true,
            cell: row => (
                <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {row.sellerName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {row.sellerEmail}
                    </div>
                </div>
            )
        },
        {
            name: 'Buyer',
            selector: row => row.buyerEmail,
            sortable: true,
            cell: row => (
                <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {row.buyerName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {row.buyerEmail}
                    </div>
                </div>
            )
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
            width: '100px',
            center: true,
            cell: row => (
                <div className="flex justify-center">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 rounded-full border dark:border-blue-700">
                        {row.quantity}
                    </span>
                </div>
            )
        },
        {
            name: 'Total Price',
            selector: row => row.totalPrice,
            sortable: true,
            width: '130px',
            cell: row => (
                <div className="flex items-center font-bold text-green-600 dark:text-green-400">
                    <FaDollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{row.totalPrice.toFixed(2)}</span>
                </div>
            )
        },
        {
            name: 'Sale Date',
            selector: row => row.saleDate,
            sortable: true,
            width: '120px',
            cell: row => (
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {new Date(row.saleDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
            )
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            width: '110px',
            center: true,
            cell: row => {
                const getStatusStyles = (status) => {
                    switch (status) {
                        case 'completed':
                            return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-green-200 dark:border-green-700';
                        case 'pending':
                            return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border-orange-200 dark:border-orange-700';
                        case 'cancelled':
                            return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border-red-200 dark:border-red-700';
                        default:
                            return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 border-gray-200 dark:border-gray-700';
                    }
                };

                return (
                    <div className="flex justify-center">
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(row.status)}`}>
                            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                        </span>
                    </div>
                );
            }
        }
    ];

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
                backgroundColor: 'transparent',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'var(--border-color)',
                backgroundColor: 'var(--header-bg)',
                minHeight: '52px',
            },
        },
        headCells: {
            style: {
                color: 'var(--header-text)',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                paddingLeft: '16px',
                paddingRight: '16px',
                letterSpacing: '0.05em',
            },
        },
        rows: {
            style: {
                minHeight: '72px',
                backgroundColor: 'var(--row-bg)',
                color: 'var(--row-text)',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderBottomColor: 'var(--border-color)',
                '&:hover': {
                    backgroundColor: 'var(--row-hover)',
                    transition: 'background-color 0.2s ease',
                },
                '&:nth-of-type(even)': {
                    backgroundColor: 'var(--row-stripe)',
                },
                '&:nth-of-type(even):hover': {
                    backgroundColor: 'var(--row-hover)',
                },
            },
        },
        cells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
                fontSize: '14px',
            },
        },
        pagination: {
            style: {
                backgroundColor: 'var(--pagination-bg)',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'var(--border-color)',
                color: 'var(--pagination-text)',
            },
            pageButtonsStyle: {
                borderRadius: '6px',
                height: '36px',
                width: '36px',
                padding: '8px',
                margin: '0 2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'var(--button-bg)',
                color: 'var(--button-text)',
                '&:hover:not(:disabled)': {
                    backgroundColor: 'var(--button-hover)',
                },
                '&:focus': {
                    outline: 'none',
                    boxShadow: '0 0 0 2px var(--focus-ring)',
                },
            },
        },
        progress: {
            style: {
                backgroundColor: 'var(--progress-bg)',
            },
        },
        noData: {
            style: {
                backgroundColor: 'var(--no-data-bg)',
                color: 'var(--no-data-text)',
                padding: '32px',
            },
        },
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Rows per page:',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
        noRowsPerPage: false,
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            style={{
                '--border-color': 'rgb(229 231 235 / 1)', // gray-200
                '--header-bg': 'rgb(249 250 251 / 1)', // gray-50
                '--header-text': 'rgb(55 65 81 / 1)', // gray-700
                '--row-bg': 'rgb(255 255 255 / 1)', // white
                '--row-text': 'rgb(17 24 39 / 1)', // gray-900
                '--row-hover': 'rgb(243 244 246 / 1)', // gray-100
                '--row-stripe': 'rgb(249 250 251 / 1)', // gray-50
                '--pagination-bg': 'rgb(255 255 255 / 1)', // white
                '--pagination-text': 'rgb(55 65 81 / 1)', // gray-700
                '--button-bg': 'rgb(255 255 255 / 1)', // white
                '--button-text': 'rgb(55 65 81 / 1)', // gray-700
                '--button-hover': 'rgb(243 244 246 / 1)', // gray-100
                '--focus-ring': 'rgb(59 130 246 / 0.5)', // blue-500/50
                '--progress-bg': 'rgb(255 255 255 / 1)', // white
                '--no-data-bg': 'rgb(255 255 255 / 1)', // white
                '--no-data-text': 'rgb(107 114 128 / 1)', // gray-500
            }}
        >
            <style jsx>{`
                .dark {
                    --border-color: rgb(55 65 81 / 1); /* gray-700 */
                    --header-bg: rgb(31 41 55 / 1); /* gray-800 */
                    --header-text: rgb(209 213 219 / 1); /* gray-300 */
                    --row-bg: rgb(17 24 39 / 1); /* gray-900 */
                    --row-text: rgb(243 244 246 / 1); /* gray-100 */
                    --row-hover: rgb(31 41 55 / 1); /* gray-800 */
                    --row-stripe: rgb(31 41 55 / 1); /* gray-800 */
                    --pagination-bg: rgb(17 24 39 / 1); /* gray-900 */
                    --pagination-text: rgb(209 213 219 / 1); /* gray-300 */
                    --button-bg: rgb(55 65 81 / 1); /* gray-700 */
                    --button-text: rgb(209 213 219 / 1); /* gray-300 */
                    --button-hover: rgb(75 85 99 / 1); /* gray-600 */
                    --focus-ring: rgb(59 130 246 / 0.5); /* blue-500/50 */
                    --progress-bg: rgb(17 24 39 / 1); /* gray-900 */
                    --no-data-bg: rgb(17 24 39 / 1); /* gray-900 */
                    --no-data-text: rgb(156 163 175 / 1); /* gray-400 */
                }
            `}</style>
            <DataTable
                title={
                    <div className="text-lg font-semibold text-gray-900 dark:text-white px-4 py-2">
                        Sales Report Data
                    </div>
                }
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                progressPending={loading}
                progressComponent={
                    <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400"></div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading sales data...</p>
                        </div>
                    </div>
                }
                noDataComponent={
                    <div className="text-center py-12 bg-white dark:bg-gray-800">
                        <FaPills className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No sales data found</h3>
                        <p className="text-gray-500 dark:text-gray-400">There are no sales records matching your criteria.</p>
                    </div>
                }
                customStyles={customStyles}
                dense={false}
                striped
                highlightOnHover
                responsive
                selectableRows
                selectableRowsHighlight
                fixedHeader
                fixedHeaderScrollHeight="400px"
                className="dark:text-white"
            />
        </div>
    );
};

export default ReportTable;
