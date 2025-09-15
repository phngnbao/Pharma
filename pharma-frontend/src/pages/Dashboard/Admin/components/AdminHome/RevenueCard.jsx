import React from 'react';

const RevenueCard = ({ title, amount, icon, color, trend, trendValue, isCount = false }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isCount ? amount.toLocaleString() : `$${amount.toFixed(2)}`}
                    </p>
                    {trend && (
                        <p className={`text-sm mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {trend === 'up' ? '↗' : '↘'} {trendValue}% so với tháng trước
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default RevenueCard;
