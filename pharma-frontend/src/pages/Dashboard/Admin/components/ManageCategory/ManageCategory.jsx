import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaTags } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CategoryTable from './CategoryTable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const ManageCategory = () => {
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // fetch categories
    const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axiosSecure.get('/categories');
            return response.data;
        }
    });

    // Add category mutation
    const addCategoryMutation = useMutation({
        mutationFn: async (categoryData) => {
            const response = await axiosSecure.post('/categories', categoryData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category added successfully');
            setIsModalOpen(false);
            setEditingCategory(null);
            reset();
        },
        onError: (error) => {
            console.error('Error adding category:', error);
            toast.error(error.response?.data?.message || 'Failed to add category');
        }
    });

    // Edit category mutation
    const editCategoryMutation = useMutation({
        mutationFn: async ({ id, categoryData }) => {
            const response = await axiosSecure.put(`/categories/${id}`, categoryData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category updated successfully');
            setIsModalOpen(false);
            setEditingCategory(null);
            reset();
        },
        onError: (error) => {
            console.error('Error updating category:', error);
            toast.error(error.response?.data?.message || 'Failed to update category');
        }
    });

    // Delete category mutation
    const deleteCategoryMutation = useMutation({
        mutationFn: async (categoryId) => {
            const response = await axiosSecure.delete(`/categories/${categoryId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting category:', error);
            toast.error(error.response?.data?.message || 'Failed to delete category');
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    useEffect(() => {
        if (categories) {
            setFilteredCategories(categories);
        }
    }, [categories]);

    // Filter categories based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = categories.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(categories);
        }
    }, [categories, searchTerm]);

    // Handle form submission (add/edit category)
    const onSubmit = async (data) => {
        try {
            const categoryData = {
                ...data,
                slug: data.name.toLowerCase().replace(/\s+/g, '-'),
                medicineCount: editingCategory?.medicineCount || 0,
                createdAt: editingCategory?.createdAt || new Date().toISOString()
            };

            if (editingCategory) {
                editCategoryMutation.mutate({
                    id: editingCategory._id,
                    categoryData
                });
            } else {
                addCategoryMutation.mutate(categoryData);
            }
        } catch (error) {
            console.error('Error in form submission:', error);
        }
    };

    // Handle edit category
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setValue('name', category.name);
        setValue('description', category.description);
        setValue('image', category.image);
        setIsModalOpen(true);
    };

    // Handle delete category
    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            deleteCategoryMutation.mutate(categoryId);
        }
    };

    // Close modal and reset form
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        reset();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manage Categories
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Organize medicines by categories
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Add Category
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaTags className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isCategoriesLoading ? '...' : categories.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <span className="text-green-600 dark:text-green-300 font-bold text-sm">P</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isCategoriesLoading ? '...' : categories.reduce((sum, cat) => sum + (cat.medicineCount || 0), 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 dark:text-purple-300 font-bold text-sm">A</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Products/Category</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isCategoriesLoading ? '...' :
                                    categories.length > 0
                                        ? Math.round(categories.reduce((sum, cat) => sum + (cat.medicineCount || 0), 0) / categories.length)
                                        : 0
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Categories ({filteredCategories.length})
                    </h3>
                </div>
                <CategoryTable
                    categories={filteredCategories}
                    onEditCategory={handleEditCategory}
                    onDeleteCategory={handleDeleteCategory}
                    loading={isCategoriesLoading}
                />
            </div>

            {/* Add/Edit Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {editingCategory ? 'Edit Category' : 'Add New Category'}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Category Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Category name is required' })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter category name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    {...register('description')}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter category description"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    {...register('image')}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter image URL"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={addCategoryMutation.isPending || editCategoryMutation.isPending}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={addCategoryMutation.isPending || editCategoryMutation.isPending}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {(addCategoryMutation.isPending || editCategoryMutation.isPending) && (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    )}
                                    <span>
                                        {(addCategoryMutation.isPending || editCategoryMutation.isPending)
                                            ? (editingCategory ? 'Updating...' : 'Adding...')
                                            : (editingCategory ? 'Update' : 'Add')} Category
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategory;
