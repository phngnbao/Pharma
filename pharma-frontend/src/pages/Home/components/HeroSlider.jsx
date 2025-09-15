// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import { FaArrowLeft, FaArrowRight, FaEye } from 'react-icons/fa';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';
// import BannerLoading from '../../../components/ui/Loading/BannerLoading';
// import axiosInstance from '../../../api/axiosInstance';
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router';
// import CloudinaryImage from '../../../components/ui/CloudinaryImage/CloudinaryImage';

// const HeroSlider = () => {
//     const navigate = useNavigate();
//     const { data: bannerAds, isLoading } = useQuery({
//         queryKey: ['bannerAds'],
//         queryFn: async () => {
//             const response = await axiosInstance.get('/advertise-requests/active/slider');
//             return response.data;
//         },
//         // staleTime: 5 * 60 * 1000, // 5 minutes
//     });

//     const handleViewDetails = (medicineId) => {
//         // Navigate to the medicine details page
//         navigate(`/medicine/${medicineId}`);
//     };

//     if (isLoading) {
//         return <BannerLoading />;
//     }

//     if (!bannerAds || !bannerAds.length) {
//         return (
//             <div className="h-96 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
//                 <div className="text-center text-white">
//                     <h2 className="text-3xl font-bold mb-4">Welcome to MediStore</h2>
//                     <p className="text-lg">No featured products available at the moment.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900">
//             <Swiper
//                 modules={[Navigation, Pagination, Autoplay, EffectFade]}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 navigation={{
//                     nextEl: '.swiper-button-next-custom',
//                     prevEl: '.swiper-button-prev-custom',
//                 }}
//                 pagination={{
//                     clickable: true,
//                     bulletClass: 'swiper-pagination-bullet-custom',
//                     bulletActiveClass: 'swiper-pagination-bullet-active-custom',
//                     dynamicBullets: false,
//                     el: '.swiper-pagination-custom',
//                 }}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                 }}
//                 effect="fade"
//                 fadeEffect={{
//                     crossFade: true,
//                 }}
//                 loop={true}
//                 className="w-full h-full"
//             >
//                 {bannerAds.map((ad) => (
//                     <SwiperSlide key={ad._id}>
//                         <div className="relative w-full min-h-[90vh] h-full">
//                             {/* Background Image with Overlay */}
//                             <div
//                                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                                 style={{
//                                     backgroundImage: `url(${ad.medicineImage})`,
//                                 }}
//                             >
//                                 {/* Dynamic overlay based on theme */}
//                                 <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
//                             </div>

//                             {/* Content */}
//                             <div className="relative z-10 flex items-center h-full">
//                                 <div className="container mx-auto min-h-[70vh] h-full px-4 sm:px-6 lg:px-8 py-16">
//                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                                         {/* Text Content */}
//                                         <div className="text-white space-y-6">
//                                             <div className="space-y-2">
//                                                 <p className="text-sm font-medium uppercase tracking-wide text-blue-300 dark:text-blue-400">
//                                                     Featured Advertisement • {ad.sellerName}
//                                                 </p>
//                                                 <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
//                                                     {ad.medicineName}
//                                                 </h1>
//                                             </div>

//                                             <p className="text-lg lg:text-xl max-w-lg leading-relaxed text-gray-200 dark:text-gray-100">
//                                                 {ad.title}
//                                             </p>

//                                             <div className="text-md max-w-lg leading-relaxed text-gray-300 dark:text-gray-200">
//                                                 {ad.description}
//                                             </div>

//                                             {/* Advertisement Info */}
//                                             <div className="flex items-center space-x-4">
//                                                 <div className="flex items-center space-x-2">
//                                                     <span className="text-2xl font-bold text-green-400 dark:text-green-300">
//                                                         Budget: ${ad.budget?.toFixed(2)}
//                                                     </span>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2 text-sm">
//                                                     <span className="px-3 py-1 bg-orange-500/30 border border-orange-400/30 text-orange-200 rounded-full dark:bg-orange-600/30 dark:border-orange-500/30 dark:text-orange-300">
//                                                         {ad.duration} days campaign
//                                                     </span>
//                                                 </div>
//                                             </div>

//                                             {/* Action Buttons */}
//                                             <div className="flex flex-col sm:flex-row gap-4">
//                                                 <button
//                                                     onClick={() => handleViewDetails(ad.medicineId)}
//                                                     className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
//                                                 >
//                                                     <FaEye className="w-5 h-5" />
//                                                     <span>View Medicine</span>
//                                                 </button>
//                                                 <button
//                                                     className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
//                                                 >
//                                                     <span>Learn More</span>
//                                                 </button>
//                                             </div>

//                                             {/* Stats */}
//                                             <div className="flex items-center space-x-6 text-sm">
//                                                 <div className="flex items-center space-x-1">
//                                                     <span className="text-gray-200 dark:text-gray-300">
//                                                         👁 {ad.impressions || 0} views
//                                                     </span>
//                                                 </div>
//                                                 <div className="flex items-center space-x-1">
//                                                     <span className="text-gray-200 dark:text-gray-300">
//                                                         👆 {ad.clicks || 0} clicks
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Product Image */}
//                                         <div className="hidden lg:block relative">
//                                             <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:from-gray-800/40 dark:to-gray-900/40 dark:border-gray-700/50">
//                                                 <CloudinaryImage
//                                                     src={ad.medicineImage}
//                                                     alt={ad.medicineName}
//                                                     className="w-full h-64 lg:h-80 object-contain drop-shadow-2xl"
//                                                 />

//                                                 {/* Advertisement Badge */}
//                                                 <div className="absolute top-4 right-4">
//                                                     <span className="px-3 py-1 bg-blue-500/80 text-white rounded-full text-xs font-medium border border-blue-400/50 dark:bg-blue-600/80 dark:text-blue-100 dark:border-blue-500/50">
//                                                         Sponsored
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>

//             {/* Custom Pagination Container */}
//             <div className="swiper-pagination-custom absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"></div>

//             {/* Custom Navigation Buttons */}
//             <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-black/30 hover:bg-black/50 text-white dark:bg-gray-800/80 dark:hover:bg-gray-700">
//                 <FaArrowLeft className="w-6 h-6" />
//             </div>
//             <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-black/30 hover:bg-black/50 text-white dark:bg-gray-800/80 dark:hover:bg-gray-700">
//                 <FaArrowRight className="w-6 h-6" />
//             </div>
//         </section>
//     );
// };

// export default HeroSlider;
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import { FaArrowLeft, FaArrowRight, FaEye } from 'react-icons/fa';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';
// import BannerLoading from '../../../components/ui/Loading/BannerLoading';
// import axiosInstance from '../../../api/axiosInstance';
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router';
// import CloudinaryImage from '../../../components/ui/CloudinaryImage/CloudinaryImage';

// const HeroSlider = () => {
//     const navigate = useNavigate();
//     const { data: bannerAds, isLoading } = useQuery({
//         queryKey: ['bannerAds'],
//         queryFn: async () => {
//             const response = await axiosInstance.get('/advertise-requests/active/slider');
//             return response.data;
//         },
//     });

//     const handleViewDetails = (medicineId) => {
//         // Chuyển hướng đến trang chi tiết thuốc
//         navigate(`/medicine/${medicineId}`);
//     };

//     if (isLoading) {
//         return <BannerLoading />;
//     }

//     if (!bannerAds || !bannerAds.length) {
//         return (
//             <div className="h-96 bg-gradient-to-r from-green-500 to-yellow-600 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
//                 <div className="text-center text-white">
//                     <h2 className="text-3xl font-bold mb-4">Chào mừng đến với MediStore</h2>
//                     <p className="text-lg">Hiện tại không có sản phẩm nổi bật nào.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900">
//             <Swiper
//                 modules={[Navigation, Pagination, Autoplay, EffectFade]}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 navigation={{
//                     nextEl: '.swiper-button-next-custom',
//                     prevEl: '.swiper-button-prev-custom',
//                 }}
//                 pagination={{
//                     clickable: true,
//                     bulletClass: 'swiper-pagination-bullet-custom',
//                     bulletActiveClass: 'swiper-pagination-bullet-active-custom',
//                     dynamicBullets: false,
//                     el: '.swiper-pagination-custom',
//                 }}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                 }}
//                 effect="fade"
//                 fadeEffect={{
//                     crossFade: true,
//                 }}
//                 loop={true}
//                 className="w-full h-full"
//             >
//                 {bannerAds.map((ad) => (
//                     <SwiperSlide key={ad._id}>
//                         <div className="relative w-full min-h-[90vh] h-full">
//                             {/* Hình nền với lớp phủ */}
//                             <div
//                                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                                 style={{
//                                     backgroundImage: `url(${ad.medicineImage})`,
//                                 }}
//                             >
//                                 <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
//                             </div>

//                             {/* Nội dung */}
//                             <div className="relative z-10 flex items-center h-full">
//                                 <div className="container mx-auto min-h-[70vh] h-full px-4 sm:px-6 lg:px-8 py-16">
//                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                                         {/* Nội dung văn bản */}
//                                         <div className="text-white space-y-6">
//                                             <div className="space-y-2">
//                                                 <p className="text-sm font-medium uppercase tracking-wide text-green-300 dark:text-green-400">
//                                                     Quảng cáo Nổi bật • {ad.sellerName}
//                                                 </p>
//                                                 <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
//                                                     {ad.medicineName}
//                                                 </h1>
//                                             </div>

//                                             <p className="text-lg lg:text-xl max-w-lg leading-relaxed text-gray-200 dark:text-gray-100">
//                                                 {ad.title}
//                                             </p>

//                                             <div className="text-md max-w-lg leading-relaxed text-gray-300 dark:text-gray-200">
//                                                 {ad.description}
//                                             </div>

//                                             {/* Thông tin quảng cáo */}
//                                             <div className="flex items-center space-x-4">
//                                                 <span className="text-2xl font-bold text-green-400 dark:text-green-300">
//                                                     Ngân sách: ${ad.budget?.toFixed(2)}
//                                                 </span>
//                                                 <span className="px-3 py-1 bg-orange-500/30 border border-orange-400/30 text-orange-200 rounded-full dark:bg-orange-600/30 dark:border-orange-500/30 dark:text-orange-300">
//                                                     Chiến dịch {ad.duration} ngày
//                                                 </span>
//                                             </div>

//                                             {/* Nút hành động */}
//                                             <div className="flex flex-col sm:flex-row gap-4">
//                                                 <button
//                                                     onClick={() => handleViewDetails(ad.medicineId)}
//                                                     className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
//                                                 >
//                                                     <FaEye className="w-5 h-5" />
//                                                     <span>Xem Thuốc</span>
//                                                 </button>
//                                                 <button
//                                                     className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
//                                                 >
//                                                     <span>Tìm Hiểu Thêm</span>
//                                                 </button>
//                                             </div>

//                                             {/* Thống kê */}
//                                             <div className="flex items-center space-x-6 text-sm">
//                                                 <span className="text-gray-200 dark:text-gray-300">
//                                                     👁 {ad.impressions || 0} lượt xem
//                                                 </span>
//                                                 <span className="text-gray-200 dark:text-gray-300">
//                                                     👆 {ad.clicks || 0} lượt nhấp
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         {/* Hình ảnh sản phẩm */}
//                                         <div className="hidden lg:block relative">
//                                             <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:from-gray-800/40 dark:to-gray-900/40 dark:border-gray-700/50">
//                                                 <CloudinaryImage
//                                                     src={ad.medicineImage}
//                                                     alt={ad.medicineName}
//                                                     className="w-full h-64 lg:h-80 object-contain drop-shadow-2xl"
//                                                 />
//                                                 <div className="absolute top-4 right-4">
//                                                     <span className="px-3 py-1 bg-blue-500/80 text-white rounded-full text-xs font-medium border border-blue-400/50 dark:bg-blue-600/80 dark:text-blue-100 dark:border-blue-500/50">
//                                                         Được Tài Trợ
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>

//             {/* Container phân trang tùy chỉnh */}
//             <div className="swiper-pagination-custom absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"></div>

//             {/* Nút điều hướng tùy chỉnh */}
//             <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-black/30 hover:bg-black/50 text-white dark:bg-gray-800/80 dark:hover:bg-gray-700">
//                 <FaArrowLeft className="w-6 h-6" />
//             </div>
//             <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-black/30 hover:bg-black/50 text-white dark:bg-gray-800/80 dark:hover:bg-gray-700">
//                 <FaArrowRight className="w-6 h-6" />
//             </div>
//         </section>
//     );
// };

// export default HeroSlider;
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight, FaSearch, FaShoppingCart, FaUserMd } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
    // Dữ liệu banner giới thiệu hệ thống
    const systemBanners = [
        {
            id: 1,
            title: "Hệ Thống Quản Lý Nhà Thuốc Hiện Đại",
            subtitle: "Giải pháp toàn diện cho ngành dược phẩm",
            description: "Nền tảng quản lý thuốc thông minh, kết nối nhà thuốc và khách hàng một cách hiệu quả nhất.",
            features: ["Quản lý kho thuốc", "Theo dõi đơn hàng", "Hỗ trợ 24/7"],
            bgGradient: "from-blue-600 to-purple-700",
            icon: <FaUserMd className="w-16 h-16 text-white/80" />
        },
        {
            id: 2,
            title: "Tìm Kiếm Thuốc Dễ Dàng",
            subtitle: "Hàng nghìn sản phẩm chất lượng cao",
            description: "Tìm kiếm và so sánh giá thuốc từ nhiều nhà thuốc uy tín trên toàn quốc với hệ thống tìm kiếm thông minh.",
            features: ["Tìm kiếm thông minh", "So sánh giá", "Đánh giá tin cậy"],
            bgGradient: "from-green-600 to-teal-700",
            icon: <FaSearch className="w-16 h-16 text-white/80" />
        },
        {
            id: 3,
            title: "Mua Sắm An Toàn & Tiện Lợi",
            subtitle: "Giao hàng nhanh chóng tại nhà",
            description: "Đặt mua thuốc online với quy trình đơn giản, an toàn và được giao hàng tận nơi trong thời gian ngắn nhất.",
            features: ["Thanh toán an toàn", "Giao hàng nhanh", "Hỗ trợ tư vấn"],
            bgGradient: "from-orange-600 to-red-700",
            icon: <FaShoppingCart className="w-16 h-16 text-white/80" />
        }
    ];

    return (
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet-custom',
                    bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                    dynamicBullets: false,
                    el: '.swiper-pagination-custom',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                loop={true}
                className="w-full h-full"
            >
                {systemBanners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative w-full min-h-[90vh] h-full">
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${banner.bgGradient} dark:from-gray-800 dark:to-gray-900`}>
                                {/* Decorative elements */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
                                    <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-2xl"></div>
                                    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-lg"></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex items-center h-full">
                                <div className="container mx-auto min-h-[70vh] h-full px-4 sm:px-6 lg:px-8 py-16">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                        {/* Text Content */}
                                        <div className="text-white space-y-8">
                                            <div className="space-y-4">
                                                <p className="text-sm font-medium uppercase tracking-wide text-white/80">
                                                    PharmaCare Vietnam
                                                </p>
                                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                                                    {banner.title}
                                                </h1>
                                            </div>

                                            <p className="text-lg lg:text-xl max-w-lg leading-relaxed text-white/90 font-medium">
                                                {banner.subtitle}
                                            </p>

                                            <p className="text-lg max-w-lg leading-relaxed text-white/80">
                                                {banner.description}
                                            </p>

                                            {/* Features List */}
                                            <div className="space-y-3">
                                                {banner.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center space-x-3">
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        <span className="text-white/90 font-medium">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                                <button className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 shadow-lg">
                                                    Khám Phá Ngay
                                                </button>
                                                <button className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900">
                                                    Tìm Hiểu Thêm
                                                </button>
                                            </div>

                                            {/* Trust Indicators */}
                                            <div className="flex items-center space-x-8 text-sm pt-6 border-t border-white/20">
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white">1000+</div>
                                                    <div className="text-white/80">Nhà thuốc</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white">50k+</div>
                                                    <div className="text-white/80">Sản phẩm</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white">24/7</div>
                                                    <div className="text-white/80">Hỗ trợ</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Icon/Visual Content */}
                                        <div className="hidden lg:flex justify-center items-center">
                                            <div className="relative">
                                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                                                    <FaUserMd className="w-12 h-12 text-white/80" />
                                                </div>
                                                {/* Floating elements */}
                                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                                                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-white/30 rounded-full animate-pulse delay-300"></div>
                                                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-white/25 rounded-full animate-pulse delay-700"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination Container */}
            <div className="swiper-pagination-custom absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"></div>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-custom absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full cursor-pointer transition-all duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30">
                <FaArrowLeft className="w-6 h-6" />
            </div>
            <div className="swiper-button-next-custom absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full cursor-pointer transition-all duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30">
                <FaArrowRight className="w-6 h-6" />
            </div>

            <style jsx>{`
                .swiper-pagination-bullet-custom {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    margin: 0 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active-custom {
                    background: white;
                    transform: scale(1.2);
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;