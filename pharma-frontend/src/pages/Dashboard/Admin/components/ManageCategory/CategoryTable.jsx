import React from 'react';
import { FaEdit, FaTrash, FaPills } from 'react-icons/fa';
import Loading from '../../../../../components/ui/Loading/Loading';

const CategoryTable = ({ categories, onEditCategory, onDeleteCategory, loading }) => {
    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Products Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img
                                        src={category.image || 'https://via.placeholder.com/40x40?text=Cat'}
                                        alt={category.name}
                                        className="h-10 w-10 rounded-lg object-cover"
                                    />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {category.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {category.slug}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 dark:text-white max-w-xs">
                                    {category.description}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaPills className="h-4 w-4 text-blue-500 mr-2" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {category.medicineCount || category.productCount || 0}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {new Date(category.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onEditCategory(category)}
                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                                        title="Edit category"
                                    >
                                        <FaEdit className="h-4 w-4" />
                                    </button>

                                    <button
                                        onClick={() => onDeleteCategory(category?._id)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                                        title="Delete category"
                                    >
                                        <FaTrash className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {categories.length === 0 && (
                <div className="text-center py-8">
                    <FaPills className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No categories found</p>
                </div>
            )}
        </div>
    );
};

export default CategoryTable;
