// import React from 'react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const HealthBlogPagination = ({
//     currentPage,
//     totalPages,
//     setCurrentPage
// }) => {
//     if (totalPages <= 1) return null;

//     return (
//         <div className="flex items-center justify-center gap-2">
//             <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//                 <FaChevronLeft /> Previous
//             </button>

//             <div className="flex items-center gap-1">
//                 {[...Array(totalPages)].map((_, index) => (
//                     <button
//                         key={index + 1}
//                         onClick={() => setCurrentPage(index + 1)}
//                         className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === index + 1
//                                 ? 'bg-blue-600 text-white dark:bg-blue-500'
//                                 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
//                             }`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>

//             <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//                 Next <FaChevronRight />
//             </button>
//         </div>
//     );
// };

// export default HealthBlogPagination;
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HealthBlogPagination = ({
    currentPage,
    totalPages,
    setCurrentPage
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <FaChevronLeft /> Trước
            </button>

            <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === index + 1
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Tiếp theo <FaChevronRight />
            </button>
        </div>
    );
};

export default HealthBlogPagination;