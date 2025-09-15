import { FaShoppingCart, FaHeart, FaCog } from 'react-icons/fa';

const UserHome = ({ userStats, user }) => {
    return (
        <>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.displayName || 'User'}!
                </h1>
                <p className="text-blue-100">
                    Manage your account and track your orders
                </p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaShoppingCart className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats?.totalOrders || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaHeart className="h-8 w-8 text-red-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Wishlist Items</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats?.wishlistItems || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold">$</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${userStats?.totalSpent || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaCog className="h-8 w-8 text-gray-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Type</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                                {userStats?.accountType || 'User'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Orders
                </h3>
                <div className="space-y-4">
                    {userStats?.recentOrders && userStats.recentOrders.length > 0 ? (
                        userStats.recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Order #{order.orderId}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <FaShoppingCart className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">Start shopping to see your orders here</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserHome;
