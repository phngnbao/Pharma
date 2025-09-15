import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';
import saveUserDataOnDb from '../../../utils/saveUserDb';
import { useTitle, PAGE_TITLES } from '../../../hooks/useTitle';

// const usersData = {
//     customer: {
//         email: 'jihad@user.com',
//         password: 'Jihad100'
//     },
//     seller: {
//         email: 'jihad@code.com',
//         password: 'Jihad100'
//     },
//     admin: {
//         email: 'jihad@admin.com',
//         password: 'Jihad100'
//     }
// }

const Login = () => {
    useTitle(PAGE_TITLES.LOGIN);
    const [showPassword, setShowPassword] = useState(false);
    const { loginWithEmailPassword, loginWithGoogle, loginWithGitHub, loading, errorMessage } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });


    // error handling
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }, [errorMessage])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            await loginWithEmailPassword(data.email, data.password);
            toast.success('Logged in successfully!');
            navigate('/');
            reset();
        } catch (error) {
            toast.error(error.message || 'Login failed!');
        }
    };

    // Handle Google login
    const handleGoogleLogin = async () => {
        try {
            const { user } = await loginWithGoogle();

            // save user data to backend
            saveUserDataOnDb({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            })

            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Google login failed!');
        }
    };

    // Handle GitHub login
    const handleGitHubLogin = async () => {
        try {
            const { user } = await loginWithGitHub();

            // save user data to backend
            saveUserDataOnDb({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            })
            toast.success('Logged in with GitHub successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'GitHub login failed!');
        }
    };

    // // handle input demo credential
    // const handleDemoCredential = (userType) => {
    //     const credentials = usersData[userType];
    //     if (credentials) {
    //         setUserCredentials(credentials);
    //         reset({
    //             email: credentials.email,
    //             password: credentials.password
    //         });
    //     } else {
    //         toast.error('Invalid user type selected');
    //     }
    // }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Đăng nhập vào tài khoản của bạn
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Chào mừng bạn trở lại
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Select User Type
                        <div>
                            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Demo User Credentials
                            </label>
                            <select
                                id="userType"
                                onChange={(e) => handleDemoCredential(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Chọn loại tài khoản</option>
                                <option value="customer">Customer</option>
                                <option value="seller">Seller</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div> */}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Vui lòng nhập địa chỉ email hợp lệ'
                                    }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Mật khẩu phải có ít nhất 6 kí tự'
                                        }
                                    })}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <FaEye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link
                                    to="/auth/forgot-password"
                                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    Hoặc tiếp tục với
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                            <span>Google</span>
                        </button>

                        <button
                            onClick={handleGitHubLogin}
                            disabled={loading}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaGithub className="h-5 w-5 text-gray-800 dark:text-white mr-2" />
                            <span>GitHub</span>
                        </button>
                    </div>

                    {/* Signup Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Chưa có tài khoản?{' '}
                            <Link
                                to="/auth/signup"
                                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                Tạo tài khoản mới
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
