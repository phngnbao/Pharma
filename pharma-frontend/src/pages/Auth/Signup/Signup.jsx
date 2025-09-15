import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../../hooks/useAuth';
import { imageUpload } from '../../../utils/imageUpload';
import Loading from '../../../components/ui/Loading/Loading';
import saveUserDataOnDb from '../../../utils/saveUserDb';
import { useTitle, PAGE_TITLES } from '../../../hooks/useTitle';
import CloudinaryImage from '../../../components/ui/CloudinaryImage/CloudinaryImage';

const Signup = () => {
    useTitle(PAGE_TITLES.SIGNUP);
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const { signupWithEmailPassword, loginWithGoogle, loading, } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // Handle image upload
    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        // Upload image and get URL
        const photoURL = await imageUpload(imageFile);
        setImagePreview(photoURL)
        setPhotoURL(photoURL);
    }

    // Handle form submission
    const onSubmit = async (data) => {
        const { username, email, password, role } = data;

        try {
            await signupWithEmailPassword(email, password, username, photoURL);

            // save user data to backend
            saveUserDataOnDb({
                email,
                displayName: username,
                role,
                photoURL,
            });

            // For now, we'll just show success message
            toast.success('Tài khoản được tạo thành công!');
            navigate('/');
            reset();
        } catch (error) {
            toast.error(error.message || 'Tạo tài khoản thất bại!');
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
                photoURL: user.photoURL
            })

            toast.success('Đăng nhập thành công!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Đăng nhập bằng Google thất bại!');
        }
    };


    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Tạo tài khoản
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Đăng ký để bắt đầu mua sắm
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                {...register('username', {
                                    required: 'Username is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Username must be at least 3 characters'
                                    }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter your username"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email là bắt buộc',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Vui lòng nhập email hợp lệ'
                                    }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Photo Upload Field */}
                        <div>
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Profile Photo
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                    <label
                                        htmlFor="photo"
                                        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <FaUpload className="mr-2" />
                                        Choose Photo
                                    </label>
                                </div>
                                {imagePreview && (
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                                        <CloudinaryImage
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
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
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                            message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
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

                        {/* Role Selection */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Chọn vai trò
                            </label>
                            <select
                                id="role"
                                {...register('role', { required: 'Please select a role' })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Chọn vai trò</option>
                                <option value="customer">Người dùng (Customer)</option>
                                <option value="seller">Người bánbán (Vendor)</option>
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Tạo tài khoản...' : 'Sign Up'}
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
                    <div className="mt-6 grid grid-cols-1 gap-3">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                            <span>Đăng ký với Google</span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Đã có tài khoản?{' '}
                            <Link
                                to="/auth/login"
                                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                Đăng nhập tại đây
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
