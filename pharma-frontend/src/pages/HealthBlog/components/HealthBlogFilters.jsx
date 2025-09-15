// import React from 'react';
// import { FaSearch, FaFilter } from 'react-icons/fa';

// const HealthBlogFilters = ({
//     searchTerm,
//     setSearchTerm,
//     selectedCategory,
//     setSelectedCategory,
//     categories
// }) => {
//     return (
//         <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
//             <div className="container mx-auto px-4 py-6">
//                 <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//                     {/* Search */}
//                     <div className="relative flex-1 max-w-md">
//                         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search articles, topics, or tags..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                         />
//                     </div>

//                     {/* Category Filter */}
//                     <div className="flex items-center gap-2">
//                         <FaFilter className="text-gray-500 dark:text-gray-400" />
//                         <select
//                             value={selectedCategory}
//                             onChange={(e) => setSelectedCategory(e.target.value)}
//                             className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                         >
//                             {categories.map(category => (
//                                 <option key={category} value={category}>{category}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HealthBlogFilters;
import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const HealthBlogFilters = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories
}) => {
    return (
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết, chủ đề hoặc thẻ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-500" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-gray-900"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthBlogFilters;