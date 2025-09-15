// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules'
// import { useQuery } from '@tanstack/react-query'

// // Import Swiper styles
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import 'swiper/css/free-mode'
// import ProductCard from './ProductCard'
// import axiosInstance from '../../../../api/axiosInstance'
// import LoadingSectionData from '../../../../components/ui/Loading/LoadingSectionData'
// import { useQueryConfig, queryKeys } from '../../../../hooks/useQueryConfig'
// import ErrorDataFetching from '../../../../components/ui/Error/ErrorDataFetching'
// import { useNavigate } from 'react-router'

// const DiscountProducts = () => {
//   const queryConfig = useQueryConfig();
//   const navigate = useNavigate();

//   // Fetch discount products using TanStack Query
//   const {
//     data: discountProducts = [],
//     isLoading,
//     error,
//     refetch
//   } = useQuery({
//     queryKey: queryKeys.discountProducts,
//     queryFn: async () => {
//       const response = await axiosInstance.get('/medicines');
//       return response.data;
//     },
//     ...queryConfig,
//   });

//   // Loading state
//   if (isLoading) {
//     return <LoadingSectionData />;
//   }

//   // Error state
//   if (error) {
//     return <ErrorDataFetching error={error} refetch={refetch} />;
//   }

//   return (
//     <section className="py-16 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
//             Special Discount Products
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Don't miss out on our exclusive deals! Get up to 40% off on premium health supplements and medicines.
//           </p>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
//         </div>

//         {/* Products Slider */}
//         <div className="relative">
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay, FreeMode]}
//             spaceBetween={24}
//             slidesPerView={1}
//             freeMode={true}
//             navigation={{
//               nextEl: '.swiper-button-next-custom',
//               prevEl: '.swiper-button-prev-custom',
//             }}
//             pagination={{
//               clickable: true,
//               dynamicBullets: true,
//             }}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//             }}
//             breakpoints={{
//               640: {
//                 slidesPerView: 2,
//               },
//               768: {
//                 slidesPerView: 3,
//               },
//               1024: {
//                 slidesPerView: 4,
//               },
//             }}
//             loop={true}
//             className="discount-products-swiper !px-12 !pb-12"
//           >
//             {discountProducts.map((product) => (
//               <SwiperSlide key={product.id}>
//                 <ProductCard product={product} />
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Custom Navigation Buttons */}
//           <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
//             <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </div>

//           <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
//             <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </div>
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-5">
//           <button
//           onClick={() => navigate('/shop')}
//           className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
//             View All Discount Products
//           </button>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         .discount-products-swiper .swiper-pagination-bullet {
//           background: #3b82f6;
//           opacity: 0.3;
//         }
        
//         .discount-products-swiper .swiper-pagination-bullet-active {
//           opacity: 1;
//           transform: scale(1.2);
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </section>
//   )
// }

// export default DiscountProducts
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules'
import { useQuery } from '@tanstack/react-query'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import ProductCard from './ProductCard'
import axiosInstance from '../../../../api/axiosInstance'
import LoadingSectionData from '../../../../components/ui/Loading/LoadingSectionData'
import { useQueryConfig, queryKeys } from '../../../../hooks/useQueryConfig'
import ErrorDataFetching from '../../../../components/ui/Error/ErrorDataFetching'
import { useNavigate } from 'react-router'

const DiscountProducts = () => {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();

  const {
    data: discountProducts = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: queryKeys.discountProducts,
    queryFn: async () => {
      const response = await axiosInstance.get('/medicines');
      return response.data;
    },
    ...queryConfig,
  });

  if (isLoading) return <LoadingSectionData />;
  if (error) return <ErrorDataFetching error={error} refetch={refetch} />;

  return (
    <section className="py-14 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
            Sản phẩm khuyến mãi
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-xl mx-auto">
            Cơ hội mua thuốc và thực phẩm chức năng với giá tốt nhất. Giảm giá lên đến 40% cho nhiều sản phẩm!
          </p>
          <div className="mt-4 w-20 h-1 mx-auto bg-blue-500 rounded-full"></div>
        </div>

        {/* Slider sản phẩm */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={16}
            slidesPerView={1}
            freeMode={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            loop={true}
            className="discount-products-swiper !px-8 !pb-10"
          >
            {discountProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nút điều hướng */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-blue-500 text-white shadow-md rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-blue-500 text-white shadow-md rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Nút xem tất cả */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
          >
            Xem tất cả sản phẩm khuyến mãi
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .discount-products-swiper .swiper-pagination-bullet {
          background: #2563eb;
          opacity: 0.4;
        }
        .discount-products-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.15);
        }
      `}</style>
    </section>
  )
}

export default DiscountProducts
