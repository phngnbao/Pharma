import React from 'react'

const ErrorDataFetching = ({ error, refetch }) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-red-600 dark:text-red-400 mb-4">Lỗi tải sản phẩm giảm giá</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                            {error.response?.data?.message || error.message}
                        </p>
                        <button
                            onClick={() => refetch()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ErrorDataFetching
