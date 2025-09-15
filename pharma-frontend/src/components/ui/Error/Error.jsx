import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

const Error = ({ message = "Something went wrong", onRetry }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center p-8">
                <div className="text-red-500 text-6xl mb-4">
                    <FaExclamationTriangle className="mx-auto" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Error!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                    {message}
                </p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors mx-auto"
                    >
                        <FaRedo /> Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default Error;
