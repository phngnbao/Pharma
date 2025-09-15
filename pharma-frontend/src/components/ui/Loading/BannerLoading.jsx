import React from 'react'

const BannerLoading = () => {
    return (
        <div className='h-96 dark:bg-gray-900 bg-gray-100 animate-pulse flex items-center justify-center'>
            <div className='dark:text-gray-400 text-gray-600'>
                Loading banner ads...
            </div>
        </div>
    )
}

export default BannerLoading
