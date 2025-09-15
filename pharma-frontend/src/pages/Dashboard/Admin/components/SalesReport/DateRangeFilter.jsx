import React from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangeFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange, onClear }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Filter by Date Range
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Start Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date
                    </label>
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={onStartDateChange}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Select start date"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            dateFormat="yyyy-MM-dd"
                        />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Date
                    </label>
                    <div className="relative">
                        <DatePicker
                            selected={endDate}
                            onChange={onEndDateChange}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="Select end date"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            dateFormat="yyyy-MM-dd"
                        />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                </div>

                {/* Clear Button */}
                <div className="flex items-end">
                    <button
                        onClick={onClear}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Clear Filter
                    </button>
                </div>
            </div>

            {/* Quick Date Filters */}
            <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Filters</p>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => {
                            const today = new Date();
                            onStartDateChange(today);
                            onEndDateChange(today);
                        }}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                        Today
                    </button>
                    <button
                        onClick={() => {
                            const today = new Date();
                            const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                            onStartDateChange(lastWeek);
                            onEndDateChange(today);
                        }}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                        Last 7 days
                    </button>
                    <button
                        onClick={() => {
                            const today = new Date();
                            const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                            onStartDateChange(lastMonth);
                            onEndDateChange(today);
                        }}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                        Last 30 days
                    </button>
                    <button
                        onClick={() => {
                            const today = new Date();
                            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                            onStartDateChange(firstDayOfMonth);
                            onEndDateChange(today);
                        }}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                        This month
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateRangeFilter;
