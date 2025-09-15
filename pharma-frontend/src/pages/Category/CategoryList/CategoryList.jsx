import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FaChevronRight } from 'react-icons/fa';
import Loading from '../../../components/ui/Loading/Loading';
import axiosInstance from '../../../api/axiosInstance';
import { useQueryConfig, queryKeys } from '../../../hooks/useQueryConfig';
import { useTitle, PAGE_TITLES } from '../../../hooks/useTitle';
import ErrorDataFetching from '../../../components/ui/Error/ErrorDataFetching';

const CategoryList = () => {
    useTitle(PAGE_TITLES.CATEGORIES);
    const queryConfig = useQueryConfig();

    // Fetch categories using TanStack Query
    const {
        data: categories = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: queryKeys.categories,
        queryFn: async () => {
            const response = await axiosInstance.get('/categories');
            return response.data;
        },
        ...queryConfig,
    }); const getColorClasses = (color) => {
        const colorMap = {
            blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
            purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
            green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
            red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
            gray: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
        };
        return colorMap[color] || colorMap.gray;
    };

    const getBorderClasses = (color) => {
        const borderMap = {
            blue: 'border-blue-200 dark:border-blue-800',
            purple: 'border-purple-200 dark:border-purple-800',
            green: 'border-green-200 dark:border-green-800',
            red: 'border-red-200 dark:border-red-800',
            gray: 'border-gray-200 dark:border-gray-800'
        };
        return borderMap[color] || borderMap.gray;
    };

    // Loading state
    if (isLoading) {
        return <Loading />;
    }

    // Error state
    if (error) {
        return <ErrorDataFetching error={error} refetch={refetch} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Danh mục thuốc
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Duyệt qua toàn bộ bộ sưu tập thuốc được tổ chức theo danh mục.
                        Tìm kiếm thuốc phù hợp với nhu cầu sức khỏe của bạn.
                        Hãy bắt đầu khám phá ngay!
                    </p>
                </div>

                {/* Category Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {categories.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Tổng số danh mục
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                {categories.reduce((total, category) => total + category.medicineCount, 0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Tổng số thuốc
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                {categories.filter(cat => cat.medicineCount > 0).length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Danh mục có sẵn
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                                24/7
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Dịch vụ có sẵn
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category._id}
                            to={`/category/${category.slug}`}
                            className="group"
                        >
                            <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${getBorderClasses(category.color)}`}>
                                {/* Category Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${getColorClasses(category.color)} opacity-80`}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <div className="text-4xl mb-2">{category.icon}</div>
                                            <h3 className="text-2xl font-bold">{category.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Category Content */}
                                <div className="p-6">
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                                        {category.description}
                                    </p>

                                    {/* Medicine Count */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {category.medicineCount}
                                            </span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                medicine{category.medicineCount !== 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        {category.medicineCount > 0 ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                                                Coming Soon
                                            </span>
                                        )}
                                    </div>

                                    {/* Browse Button */}
                                    <div className="flex items-center justify-between">
                                        {category.medicineCount > 0 ? (
                                            <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300">
                                                Xem thêm thuốc
                                                <FaChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center text-sm font-medium text-gray-400 dark:text-gray-600">
                                                Hiện tại không có thuốc nào
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Không tìm thấy gì?
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Xem tất cả thuốc hoặc liên hệ với chuyên gia thuốc để được hỗ trợ.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/shop"
                                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                            >
                                Xem tất cả thuốc
                            </Link>
                            <button className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-300">
                                Liên hệ hỗ trợ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
