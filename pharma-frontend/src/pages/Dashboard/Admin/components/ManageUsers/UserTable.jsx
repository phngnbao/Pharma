import React from 'react';
import { FaEdit, FaTrash, FaUserShield, FaStore, FaUser, FaSpinner } from 'react-icons/fa';
import Loading from '../../../../../components/ui/Loading/Loading';
import CloudinaryImage from '../../../../../components/ui/CloudinaryImage/CloudinaryImage';

const UserTable = ({ users, onRoleChange, onDeleteUser, loading, isUpdating, isDeleting }) => {
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin':
                return <FaUserShield className="h-4 w-4 text-red-500" />;
            case 'seller':
                return <FaStore className="h-4 w-4 text-blue-500" />;
            default:
                return <FaUser className="h-4 w-4 text-gray-500" />;
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border-red-200 dark:border-red-700';
            case 'seller':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200 dark:border-blue-700';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            User Information
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Current Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Member Since
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {users?.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <CloudinaryImage
                                            src={user.photoURL || user.photo}
                                            alt={user.displayName || user.name}
                                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                                            fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.name || 'User')}&background=3b82f6&color=fff`}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {user.displayName || user.name || 'No Name'}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            ID: {user._id}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white font-medium">
                                    {user.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                    {getRoleIcon(user.role || 'user')}
                                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(user.role || 'user')}`}>
                                        {(user.role || 'user').charAt(0).toUpperCase() + (user.role || 'user').slice(1)}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {user.createdAt || user.createAt ? new Date(user.createdAt || user.createAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                }) : 'Unknown'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-3">
                                    {/* Role Change Dropdown */}
                                    <div className="relative">
                                        <select
                                            value={user.role || 'user'}
                                            onChange={(e) => onRoleChange(user._id, e.target.value)}
                                            disabled={isUpdating || isDeleting}
                                            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                                            title="Change user role"
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="seller">Seller</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {isUpdating && (
                                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                                <FaSpinner className="h-3 w-3 animate-spin text-blue-500" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => onDeleteUser(user._id)}
                                        disabled={isUpdating || isDeleting}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Delete user"
                                    >
                                        {isDeleting ? (
                                            <FaSpinner className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <FaTrash className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {(!users || users.length === 0) && (
                <div className="text-center py-12 bg-white dark:bg-gray-800">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                        <FaUser className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No users found</h3>
                    <p className="text-gray-500 dark:text-gray-400">No users match your current search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default UserTable;
