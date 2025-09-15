// import React from 'react'
// import { FaArrowRight } from 'react-icons/fa';
// import { useNavigate } from 'react-router';

// const CategoryCard = ({ category, getColorClasses, index }) => {
//     const colorClasses = getColorClasses(category.color);

//     const navigate = useNavigate();
//     const handleNavigate = () => {
//         navigate(`/category/${category.slug}`);
//     };

//     return (
//         <div
//             key={category._id}
//             onClick={handleNavigate}
//             data-aos="fade-up-right"
//             data-aos-duration={index * 1000}
//             className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
//         >
//             {/* Category Image */}
//             <div className="relative h-48 overflow-hidden">
//                 <img
//                     src={category.image}
//                     alt={category.slug}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div className={`absolute inset-0 bg-gradient-to-t ${colorClasses.gradient} opacity-80`}></div>

//                 {/* Icon Overlay */}
//                 <div className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full">
//                     {category?.icon}
//                 </div>

//                 {/* Medicine Count Badge */}
//                 <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
//                     <span className="text-sm font-semibold text-gray-900">
//                         {category.medicineCount} medicines
//                     </span>
//                 </div>
//             </div>

//             {/* Category Info */}
//             <div className="p-6">
//                 <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors duration-200">
//                         {category.name}
//                     </h3>
//                     <FaArrowRight className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ${colorClasses.text}`} />
//                 </div>

//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
//                     {category.description}
//                 </p>

//                 {/* Stats */}
//                 <div className={`flex items-center justify-between p-3 rounded-lg ${colorClasses.bg}`}>
//                     <div className="flex items-center space-x-2">
//                         <i>{category?.icon}</i>
//                         <span className={`text-sm font-medium ${colorClasses.text}`}>
//                             Available Now
//                         </span>
//                     </div>
//                     <span className={`text-lg font-bold ${colorClasses.text}`}>
//                         {category.medicineCount}
//                     </span>
//                 </div>
//             </div>

//             {/* Hover Effect Border */}
//             {/* <div className={`absolute inset-0 border-2 border-transparent group-hover:${colorClasses.border} rounded-xl transition-all duration-200 pointer-events-none`}></div> */}
//         </div>
//     )
// }

// export default CategoryCard
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const CategoryCard = ({ category, getColorClasses, index, variant = "horizontal" }) => {
  const colorClasses = getColorClasses(category.color);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/category/${category.slug}`, {
      state: { categoryId: category._id, categoryName: category.name }
    });
  };

  // --- Kiểu Horizontal ---
  const renderHorizontal = () => (
    <div
      key={category._id}
      onClick={handleNavigate}
      data-aos="fade-up"
      data-aos-duration={600 + index * 150}
      className="group flex items-center gap-5 p-5 rounded-xl shadow-md hover:shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300"
    >
      {/* Ảnh bên trái */}
      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={category.image}
          alt={category.slug}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Nội dung bên phải */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
          {category.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {category.medicineCount} sản phẩm
          </span>
          <FaArrowRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  // --- Kiểu Icon-centered ---
  const renderIconCentered = () => (
    <div
      key={category._id}
      onClick={handleNavigate}
      data-aos="zoom-in"
      data-aos-duration={600 + index * 150}
      className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
        {category?.icon}
      </div>
      <h3 className="text-center text-lg font-bold text-gray-900 dark:text-white">
        {category.name}
      </h3>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
        {category.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{category.medicineCount} sản phẩm</span>
        <FaArrowRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );

  // --- Kiểu Minimal ---
  const renderMinimal = () => (
    <div
      key={category._id}
      onClick={handleNavigate}
      data-aos="fade-up"
      data-aos-duration={600 + index * 150}
      className="group flex flex-col items-start p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{category?.icon}</span>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600">
          {category.name}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {category.description}
      </p>
      <div className="flex items-center justify-between w-full text-sm text-gray-500 dark:text-gray-400">
        <span>{category.medicineCount} sản phẩm</span>
        <FaArrowRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );

  // Chọn render theo variant
  if (variant === "icon") return renderIconCentered();
  if (variant === "minimal") return renderMinimal();
  return renderHorizontal(); // mặc định
};

export default CategoryCard;

