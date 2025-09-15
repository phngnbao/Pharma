import React from 'react'

const LoadingSectionData = () => {
    return (
        <section className='py-16 dark:bg-gray-900  bg-gray-50'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className='h-8 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse bg-gray-200'></div>
                    <div className='h-4 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse bg-gray-200'></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className='dark:bg-gray-800 rounded-xl p-6 animate-pulse bg-white'>
                            <div className='h-32 dark:bg-gray-700 rounded-lg mb-4 bg-gray-200'></div>
                            <div className='h-6 dark:bg-gray-700 rounded mb-2 bg-gray-200'></div>
                            <div className='h-4 dark:bg-gray-700 rounded w-3/4 bg-gray-200'></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LoadingSectionData
