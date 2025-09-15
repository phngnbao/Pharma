import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaShoppingCart,
    FaHeart,
    FaShare,
    FaCheck,
    FaTimes,
    FaUserMd,
    FaClock,
    FaBoxOpen,
    FaChevronLeft,
    FaExclamationTriangle,
    FaTag,
    FaStore,
    FaCalendarAlt,
    FaPills,
    FaShieldAlt
} from 'react-icons/fa';
import { useTitle } from '../../hooks/useTitle';
import { useAuth } from '../../hooks/useAuth';
import axiosInstance from '../../api/axiosInstance';
import Loading from '../../components/ui/Loading/Loading';
import Error from '../../components/ui/Error/Error';
import ReviewSection from './components/ReviewSection';
import SpecificationSection from './components/SpecificationSection';

const MedicineDetails = () => {
    const { medicineId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState('description');


    // Fetch medicine details
    const { data: medicine, isLoading, error } = useQuery({
        queryKey: ['medicine', medicineId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/medicines/${medicineId}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    // Fetch related medicines
    const { data: relatedMedicines = [] } = useQuery({
        queryKey: ['relatedMedicines', medicine?.category],
        queryFn: async () => {
            if (!medicine?.category) return [];
            const response = await axiosInstance.get(`/medicines?category=${medicine.category}&limit=4`);
            return response.data.filter(item => item._id !== medicineId);
        },
        enabled: !!medicine?.category,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    // Set page title
    useTitle(medicine ? `${medicine.name} - Medicine Details` : 'Medicine Details');

    // Initialize AOS
    useEffect(() => {
        if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }, []);

    // Sample additional images (in real app, this would come from the API)
    const additionalImages = medicine ? [
        medicine.image,
        medicine.image, // You could have different angles/views
        medicine.image,
        medicine.image
    ] : [];

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= (medicine?.stockQuantity || 1)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/auth/login');
            return;
        }

        try {
            await axiosInstance.post('/cart/add', {
                medicineId: medicine._id,
                quantity: quantity
            });
            // Show success message or update cart state
            alert('Medicine added to cart successfully!');
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Failed to add medicine to cart. Please try again.');
        }
    };

    const handleWishlistToggle = async () => {
        if (!user) {
            navigate('/auth/login');
            return;
        }

        try {
            if (isWishlisted) {
                await axiosInstance.delete(`/wishlist/${medicine._id}`);
            } else {
                await axiosInstance.post('/wishlist/add', {
                    medicineId: medicine._id
                });
            }
            setIsWishlisted(!isWishlisted);
        } catch (error) {
            console.error('Failed to update wishlist:', error);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: medicine.name,
                text: `Check out ${medicine.name} - ${medicine.description}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
        }

        return stars;
    };

    // Handle loading state
    if (isLoading) {
        return <Loading />;
    }

    // Handle error state
    if (error) {
        return (
            <Error
                message="Failed to load medicine details"
                onRetry={() => window.location.reload()}
            />
        );
    }

    // Handle not found
    if (!medicine) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">💊</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Không tìm thấy thuốc</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Không tìm thấy thuốc với tên này. Vui lòng thử lại với tên khác.
                    </p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Tìm thuốc
                    </button>
                </div>
            </div>
        );
    }

    const discountAmount = medicine.pricePerUnit - medicine.discountPrice;
    const discountPercentage = Math.round((discountAmount / medicine.pricePerUnit) * 100);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-2"
                        data-aos="fade-right"
                    >
                        <FaChevronLeft /> Back
                    </button>
                    <nav className="text-sm text-gray-600 dark:text-gray-400">
                        <span onClick={() => navigate('/')} className="hover:text-blue-600 cursor-pointer">Home</span>
                        <span className="mx-2">/</span>
                        <span onClick={() => navigate('/shop')} className="hover:text-blue-600 cursor-pointer">Medicines</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 dark:text-white">{medicine.name}</span>
                    </nav>
                </div>
            </div>

              <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column - Single Image */}
                    <div data-aos="fade-right">
                        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                            <img src={medicine.imageUrls} alt={medicine.name} className="w-full h-96 object-contain p-8" />
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6" data-aos="fade-left">
                        {/* Title and Basic Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                                    {medicine.category}
                                </span>
                                {medicine.inStock ? (
                                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                        <FaCheck className="text-xs" /> In Stock
                                    </span>
                                ) : (
                                    <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                        <FaTimes className="text-xs" /> Out of Stock
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {medicine.name}
                            </h1>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                                <span className="font-medium">Tên chung:</span> {medicine.genericName}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    {renderStars(medicine.rating)}
                                </div>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {medicine.rating}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">
                                    ({medicine.reviews} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                    ${medicine.discountPrice}
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                                        VNĐ {medicine.unit}
                                    </span>
                                </div>
                                {medicine.discount > 0 && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                            ${medicine.pricePerUnit}
                                        </span>
                                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                                            -{discountPercentage}%
                                        </span>
                                    </div>
                                )}
                            </div>

                            {medicine.discount > 0 && (
                                <p className="text-green-600 dark:text-green-400 font-medium">
                                    Bạn sẽ giảm ${discountAmount.toFixed(2)} mỗi đơn vị!
                                </p>
                            )}
                        </div>

                        {/* Company Info */}
                        {/* <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <FaStore className="text-blue-600 dark:text-blue-400 text-xl" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Nhà sản xuất
                                </p>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                                    {medicine.company}
                                </p>
                            </div>
                        </div> */}

                        {/* Quantity Selection */}
                        <div className="flex items-center gap-4">
                            <label className="font-medium text-gray-900 dark:text-white">
                                Số lượng:
                            </label>
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-600">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    disabled={quantity >= medicine.stockQuantity}
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {medicine.stockQuantity} đơn vị có sẵn
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={!medicine.inStock}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <FaShoppingCart /> Thêm vào giỏ hàng
                            </button>
                            <button
                                onClick={handleWishlistToggle}
                                className={`px-4 py-3 rounded-lg border-2 transition-colors ${isWishlisted
                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-red-500 text-gray-600 dark:text-gray-400'
                                    }`}
                            >
                                <FaHeart className={isWishlisted ? 'fill-current' : ''} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-600 dark:text-gray-400 transition-colors"
                            >
                                <FaShare />
                            </button>
                        </div>

                        {/* Seller Info */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <FaUserMd /> Người bán
                            </h3>
                            <div className="flex items-center gap-3">
                                <img
                                    src={medicine.seller?.photoURL}
                                    alt={medicine.seller?.displayName || 'Seller'}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {medicine.seller?.displayName || 'Seller'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {medicine.seller?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information Tabs */}
                <div className="mt-12" data-aos="fade-up">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'description'
                                        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                        : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200'
                                        }`}
                                >
                                    Mô tả
                                </button>
                                <button
                                    onClick={() => setActiveTab('specifications')}
                                    className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'specifications'
                                        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                        : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200'
                                        }`}
                                >
                                    Thông số
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'reviews'
                                        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                        : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200'
                                        }`}
                                >
                                    Reviews ({medicine.reviews})
                                </button>
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'description' && (
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        About {medicine.name}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {medicine.description}
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                <FaPills /> Thông tin liều lượng
                                            </h4>
                                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                                <li><strong>Strength:</strong> {medicine.massUnit}</li>
                                                <li><strong>Form:</strong> {medicine.category}</li>
                                                <li><strong>Generic Name:</strong> {medicine.genericName}</li>
                                                <li><strong>Manufacturer:</strong> {medicine.company}</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                <FaShieldAlt /> Thông tin an toàn
                                            </h4>
                                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                                <p className="text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
                                                    <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                                                    <span className="text-sm">
                                                        Hãy tham khảo ý kiến với chuyên gia y tế trước khi sử dụng thuốc này.
                                                        Đọc kỹ tất cả hướng dẫn và cảnh báo trước khi sử dụng.
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'specifications' && (
                                <SpecificationSection medicine={medicine} />
                            )}

                            {activeTab === 'reviews' && (
                                <ReviewSection
                                    initialReviews={[
                                   {
                                           id: 1,
                                           user: {
                                               name: 'Nguyễn Thị Lan',
                                                     avatar: '/default-avatar.png'
                                                 },
                                            rating: 5,
                                          title: 'Thuốc chất lượng tuyệt vời',
                                          comment: 'Thuốc này rất hiệu quả, đúng như mô tả. Giao hàng nhanh và sản phẩm chính hãng. Rất khuyên dùng!',
                                          date: '15/01/2024',
                                         helpful: 12,
                                          notHelpful: 1
                             },
                              {
                                 id: 2,
                                     user: {
                                         name: 'Trần Văn Minh',
                                       avatar: '/default-avatar.png'
                                      },
                                    rating: 4,
                                     title: 'Giá cả hợp lý',
                                      comment: 'Thuốc hiệu quả với mức giá hợp lý. Bao bì chắc chắn, giao hàng đúng hẹn.',
                                     date: '10/01/2024',
                                    helpful: 8,
                                     notHelpful: 0
                                 }
                                ]}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Medicines */}
                {relatedMedicines.length > 0 && (
                    <div className="mt-12" data-aos="fade-up">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            Related Medicines
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedMedicines.map((relatedMedicine) => (
                                <div
                                    key={relatedMedicine._id}
                                    onClick={() => navigate(`/medicine/${relatedMedicine._id}`)}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                                >
                                    <img
                                        src={relatedMedicine.imageUrls}
                                        alt={relatedMedicine.name}
                                        className="w-full h-40 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                            {relatedMedicine.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            {relatedMedicine.company}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                                ${relatedMedicine.discountPrice}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <FaStar className="text-yellow-400 text-sm" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {relatedMedicine.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicineDetails;
