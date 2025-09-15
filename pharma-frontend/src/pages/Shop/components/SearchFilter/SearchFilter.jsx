import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { BiSort } from 'react-icons/bi';

const SearchFilter = ({
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm thuốc..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <FaFilter className="absolute left-3 top-3 text-gray-400" />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="all">Tất cả</option>
                        <option value="Thuốc giảm đau">Thuốc giảm đau</option>
                        <option value="Thuốc kháng sinh">Thuốc kháng sinh</option>
                        <option value="Vitamin và khoáng chất">Vitamin và khoáng chất</option>
                        <option value="Thuốc cảm lạnh và cảm">Thuốc cảm lạnh và cảm</option>
                        <option value="Thuốc tiêu hóa">Thuốc tiêu hóa</option>
                        <option value="Công dụng khác">Công dụng khác</option>
                    </select>
                </div>

                {/* Sort By */}
                <div className="relative">
                    <BiSort className="absolute left-3 top-3 text-gray-400" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="name">Sắp xếp theo tên</option>
                        <option value="pricePerUnit">Sắp xếp theo giá</option>
                        <option value="companyName">Sắp xếp theo hãng</option>
                        <option value="categoryName">Sắp xếp theo danh mục</option>
                    </select>
                </div>

                {/* Sort Order */}
                <div>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
