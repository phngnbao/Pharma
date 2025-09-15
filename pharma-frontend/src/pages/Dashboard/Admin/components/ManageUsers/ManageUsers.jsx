import React, { useState, useMemo } from 'react';
import { FaUsers, FaSearch, FaFilter, FaUserShield, FaStore, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import UserTable from './UserTable';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../../../components/ui/Loading/Loading';


const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch users using TanStack Query
    const { data: users = [], isLoading: isUsersLoading, error } = useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Role update mutation
    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            const response = await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
            return response.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['admin-users']);
            toast.success(`User role updated to ${variables.newRole} successfully`);
        },
        onError: (error) => {
            console.error('Error updating user role:', error);
            toast.error(error.response?.data?.message || 'Failed to update user role');
        },
    });

    // Delete user mutation
    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            const response = await axiosSecure.delete(`/users/${userId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-users']);
            toast.success('User deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
            toast.error(error.response?.data?.message || 'Failed to delete user');
        },
    });

    // Filter users based on search term and role filter
    const filteredUsers = useMemo(() => {
        let filtered = users;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by role
        if (roleFilter !== 'all') {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        return filtered;
    }, [users, searchTerm, roleFilter]);

    // Handle role change
    const handleRoleChange = async (userId, newRole) => {
        if (updateRoleMutation.isLoading) return;

        const user = users.find(u => u._id === userId);
        const currentRole = user?.role || 'user';

        if (currentRole === newRole) {
            toast.info(`User is already a ${newRole}`);
            return;
        }

        const confirmMessage = `Are you sure you want to change this user's role from ${currentRole} to ${newRole}?`;
        if (window.confirm(confirmMessage)) {
            updateRoleMutation.mutate({ userId, newRole });
        }
    };

    // Handle user deletion
    const handleDeleteUser = async (userId) => {
        if (deleteUserMutation.isLoading) return;

        const user = users.find(u => u._id === userId);
        const userName = user?.displayName || user?.name || user?.email;

        const confirmMessage = `Are you sure you want to delete user "${userName}"? This action cannot be undone.`;
        if (window.confirm(confirmMessage)) {
            deleteUserMutation.mutate(userId);
        }
    };

    // Get user statistics
    const getUserStats = useMemo(() => {
        const stats = users.reduce((acc, user) => {
            const role = user.role || 'customer';
            acc[role] = (acc[role] || 0) + 1;
            return acc;
        }, {});

        return {
            total: users.length,
            admin: stats.admin || 0,
            seller: stats.seller || 0,
            user: stats.user || 0
        };
    }, [users]);

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400 mb-2">Error loading users</p>
                    <button
                        onClick={() => queryClient.invalidateQueries(['admin-users'])}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Loading state
    if (isUsersLoading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manage Users
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage user roles and permissions - promote users to seller/admin or downgrade them
                    </p>
                </div>

                {/* Action Status */}
                {(updateRoleMutation.isLoading || deleteUserMutation.isLoading) && (
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                        <span className="text-sm">
                            {updateRoleMutation.isLoading ? 'Updating role...' : 'Deleting user...'}
                        </span>
                    </div>
                )}
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center">
                        <FaUsers className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{getUserStats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                            <FaUserShield className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{getUserStats.admin}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                            <FaStore className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sellers</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{getUserStats.seller}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <FaUser className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Regular Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{getUserStats.user}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Search Users
                        </label>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or display name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Role Filter */}
                    <div className="md:w-48">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Filter by Role
                        </label>
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="seller">Seller</option>
                                <option value="user">Regular User</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Filter Summary */}
                {(searchTerm || roleFilter !== 'all') && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                            {searchTerm && (
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                                    Search: "{searchTerm}"
                                </span>
                            )}
                            {roleFilter !== 'all' && (
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                                    Role: {roleFilter}
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setRoleFilter('all');
                                }}
                                className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                User Management ({filteredUsers.length})
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Promote users to seller/admin or downgrade roles as needed
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>{filteredUsers.filter(u => u.role === 'admin').length} admins</span>
                            <span>{filteredUsers.filter(u => u.role === 'seller').length} sellers</span>
                            <span>{filteredUsers.filter(u => u.role === 'user' || !u.role).length} users</span>
                        </div>
                    </div>
                </div>
                <UserTable
                    users={filteredUsers}
                    onRoleChange={handleRoleChange}
                    onDeleteUser={handleDeleteUser}
                    loading={isUsersLoading}
                    isUpdating={updateRoleMutation.isLoading}
                    isDeleting={deleteUserMutation.isLoading}
                />
            </div>

            {/* User Management Guidelines */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                    <FaUserShield className="mr-2" />
                    User Management Guidelines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Role Promotions:</h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            <li>• <strong>User → Seller:</strong> Grants access to seller dashboard and medicine management</li>
                            <li>• <strong>User → Admin:</strong> Grants full administrative access</li>
                            <li>• <strong>Seller → Admin:</strong> Promotes seller to administrative role</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Role Downgrades:</h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            <li>• <strong>Admin → Seller:</strong> Removes admin privileges, keeps seller access</li>
                            <li>• <strong>Admin → User:</strong> Removes all special privileges</li>
                            <li>• <strong>Seller → User:</strong> Removes seller access and medicine management</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Note:</strong> Role changes take effect immediately. Users will need to refresh their browser to see new permissions.
                        Be cautious when changing admin roles as it affects system access.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
