import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Invoice from "../pages/Invoice/Invoice";
import CategoryList from "../pages/Category/CategoryList/CategoryList";
import CategoryDetails from "../pages/Category/CategoryDetails/CategoryDetails";
import MedicineDetails from "../pages/MedicineDetails/MedicineDetails";
import Signup from "../pages/Auth/Signup/Signup";
import Login from "../pages/Auth/Login/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import SellerDashboard from "../pages/Dashboard/Seller/SellerDashboard";
import AdminProtectedRoute from "../components/common/ProtectedRoute/AdminProtectedRoute";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";
import SellerProtectedRoute from "../components/common/ProtectedRoute/SellerProtectedRoute";
import AuthRouteProtect from "../components/common/AuthRouteProtect/AuthRouteProtect";
import Dashboard from "../pages/Dashboard/Dashboard";
import UpdateProfile from "../pages/Dashboard/User/components/UpdateProfile/UpdateProfile";
import HealthBlog from "../pages/HealthBlog/HealthBlog";
import HealthBlogDetails from "../pages/HealthBlog/HealthBlogDetails/HealthBlogDetails";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "shop",
                Component: Shop,
            },
            {
                path: "medicine/:medicineId",
                Component: MedicineDetails,
            },
            {
                path: "cart",
                Component: Cart,
            },
            {
                path: "checkout",
                Component: Checkout,
            },
            {
                path: "invoice",
                Component: Invoice,
            },
            {
                path: "categories",
                Component: CategoryList,
            },
            {
                path: "category/:categorySlug",
                Component: CategoryDetails,
            },
            {
                path: "/update-profile",
                element: <ProtectedRoute>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-auto py-7">
                        <UpdateProfile />
                    </div>
                </ProtectedRoute>
            },
            {
                path: "/health-blogs",
                Component: HealthBlog
            },
            {
                path: "/health-blogs/:blogId",
                Component: HealthBlogDetails
            }
        ],
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "signup",
                element: <AuthRouteProtect><Signup /></AuthRouteProtect>
            },
            {
                path: "login",
                element: <AuthRouteProtect><Login /></AuthRouteProtect>
            },
            {
                path: "forgot-password",
                element: <AuthRouteProtect><ForgotPassword /></AuthRouteProtect>
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard/user",
        element: (
            <ProtectedRoute>
                <UserDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard/seller",
        element: (
            <ProtectedRoute>
                <SellerProtectedRoute>
                    <SellerDashboard />
                </SellerProtectedRoute>
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard/admin",
        element: (
            <ProtectedRoute>
                <AdminProtectedRoute>
                    <AdminDashboard />
                </AdminProtectedRoute>
            </ProtectedRoute>
        ),
    },
]);


export default router;