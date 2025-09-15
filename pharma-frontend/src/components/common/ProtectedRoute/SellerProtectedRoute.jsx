import { Navigate } from 'react-router';
import Loading from '../../ui/Loading/Loading';
import { useAuth } from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const SellerProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { role: userRole, isLoading } = useRole();

    if (loading || isLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (userRole.role !== 'seller') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="max-w-md mx-auto text-center">
                    <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-red-600 text-3xl">🚫</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Access Denied
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        You need seller privileges to access this page.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default SellerProtectedRoute;
