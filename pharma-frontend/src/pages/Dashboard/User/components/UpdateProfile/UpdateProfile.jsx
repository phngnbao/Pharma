import { FaUser, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../../components/ui/Loading/Loading';
import CloudinaryImage from '../../../../../components/ui/CloudinaryImage/CloudinaryImage';

const UpdateProfile = () => {
    const { user, profileUpdate } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data: userData, isLoading: isProfileLoading } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/profile/${user?.email}`);
            return response.data;
        },
    });


    // React Hook Form setup
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isDirty }
    } = useForm({
        mode: 'onChange'
    });

    // Update form when userData loads
    useEffect(() => {
        if (userData) {
            reset({
                displayName: userData.displayName || '',
                photoURL: userData.photoURL || '',
                phone: userData.phone || '',
                address: userData.address || '',
                dateOfBirth: userData.dateOfBirth || '',
                gender: userData.gender || ''
            });
        }
    }, [userData, reset]);

    // Watch form values for real-time updates
    const watchedValues = watch();

    const handleSaveProfile = async (data) => {
        setIsLoading(true);
        try {
            // Update Firebase profile
            await profileUpdate(data.displayName, data.photoURL);

            // update user profile in database
            await axiosSecure.put('/users/profile', {
                email: user.email,
                ...data
            });

            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset({
            displayName: userData?.displayName || '',
            photoURL: userData?.photoURL || '',
            phone: userData?.phone || '',
            address: userData?.address || '',
            dateOfBirth: userData?.dateOfBirth || '',
            gender: userData?.gender || ''
        });
        setIsEditing(false);
    };

    // when profile data is loading
    if (isProfileLoading || !userData) {
        return <Loading />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Profile Information
                </h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FaEdit />
                        <span>Edit Profile</span>
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleSubmit(handleSaveProfile)}
                            disabled={isLoading || !isDirty}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave />
                            <span>{isLoading ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                            <FaTimes />
                            <span>Cancel</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {/* Profile Picture Section */}
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        {watchedValues.photoURL || userData?.photoURL ? (
                            <CloudinaryImage
                                src={watchedValues.photoURL || userData?.photoURL}
                                alt={watchedValues.displayName || userData?.displayName}
                                className="h-20 w-20 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-600"
                            />
                        ) : (
                            <div className="h-20 w-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center ring-4 ring-gray-200 dark:ring-gray-600">
                                <FaUser className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                            </div>
                        )}
                        {isEditing && (
                            <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                                <FaCamera className="h-3 w-3 text-white" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                            {watchedValues.displayName || userData?.displayName || 'User Name'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user?.email}
                        </p>
                    </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Display Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                        </label>
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    {...register("displayName", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }
                                    })}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.displayName
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.displayName && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.displayName.message}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                {watchedValues.displayName || userData?.displayName || 'Not provided'}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                        </label>
                        {isEditing ? (
                            <div>
                                <input
                                    type="tel"
                                    {...register("phone", {
                                        pattern: {
                                            value: /^[+]?[\d\s\-()]+$/,
                                            message: "Please enter a valid phone number"
                                        }
                                    })}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.phone
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                {watchedValues.phone || userData?.phone || 'Not provided'}
                            </p>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date of Birth
                        </label>
                        {isEditing ? (
                            <div>
                                <input
                                    type="date"
                                    {...register("dateOfBirth")}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>
                        ) : (
                            <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                {watchedValues.dateOfBirth || userData?.dateOfBirth || 'Not provided'}
                            </p>
                        )}
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Gender
                        </label>
                        {isEditing ? (
                            <div>
                                <select
                                    {...register("gender")}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>
                        ) : (
                            <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white capitalize">
                                {watchedValues.gender || userData?.gender || 'Not provided'}
                            </p>
                        )}
                    </div>

                    {/* Photo URL */}
                    {isEditing && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Profile Photo URL
                            </label>
                            <div>
                                <input
                                    type="url"
                                    {...register("photoURL", {
                                        pattern: {
                                            value: /^https?:\/\/.+\./,
                                            message: "Please enter a valid image URL"
                                        }
                                    })}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.photoURL
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter photo URL"
                                />
                                {errors.photoURL && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.photoURL.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Address
                        </label>
                        {isEditing ? (
                            <div>
                                <textarea
                                    {...register("address")}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter your address"
                                />
                            </div>
                        ) : (
                            <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                {watchedValues.address || userData?.address || 'Not provided'}
                            </p>
                        )}
                    </div>
                </div>

                {/* Account Information */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Account Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Account Type
                            </label>
                            <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white capitalize">
                                {user?.role || 'Customer'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
