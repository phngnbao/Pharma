// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { FaTablets, FaFlask, FaCapsules, FaSyringe, FaPrescriptionBottleAlt, FaArrowRight } from 'react-icons/fa';
// import CategoryCard from './CategoryCard';
// import axiosInstance from '../../../../api/axiosInstance';
// import LoadingSectionData from '../../../../components/ui/Loading/LoadingSectionData';

// const CategoryCards = () => {
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Simulate API call to fetch categories
//         const fetchCategories = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axiosInstance.get('/categories');
//                 setCategories(response.data.slice(0, 6));
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setLoading(false);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleCategoryClick = (category) => {
//         // Navigate to category details page
//         navigate(`/category/${category.categoryName.toLowerCase()}`, {
//             state: { categoryId: category._id, categoryName: category.categoryName }
//         });
//     };

//     const getColorClasses = (color) => {
//         const colors = {
//             blue: {
//                 gradient: 'from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800',
//                 border: 'border-blue-500 dark:border-blue-400',
//                 text: 'text-blue-600 dark:text-blue-400',
//                 bg: 'bg-blue-50 dark:bg-blue-900/20'
//             },
//             purple: {
//                 gradient: 'from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800',
//                 border: 'border-purple-500 dark:border-purple-400',
//                 text: 'text-purple-600 dark:text-purple-400',
//                 bg: 'bg-purple-50 dark:bg-purple-900/20'
//             },
//             green: {
//                 gradient: 'from-green-500 to-green-700 dark:from-green-600 dark:to-green-800',
//                 border: 'border-green-500 dark:border-green-400',
//                 text: 'text-green-600 dark:text-green-400',
//                 bg: 'bg-green-50 dark:bg-green-900/20'
//             },
//             red: {
//                 gradient: 'from-red-500 to-red-700 dark:from-red-600 dark:to-red-800',
//                 border: 'border-red-500 dark:border-red-400',
//                 text: 'text-red-600 dark:text-red-400',
//                 bg: 'bg-red-50 dark:bg-red-900/20'
//             },
//             indigo: {
//                 gradient: 'from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-800',
//                 border: 'border-indigo-500 dark:border-indigo-400',
//                 text: 'text-indigo-600 dark:text-indigo-400',
//                 bg: 'bg-indigo-50 dark:bg-indigo-900/20'
//             },
//             orange: {
//                 gradient: 'from-orange-500 to-orange-700 dark:from-orange-600 dark:to-orange-800',
//                 border: 'border-orange-500 dark:border-orange-400',
//                 text: 'text-orange-600 dark:text-orange-400',
//                 bg: 'bg-orange-50 dark:bg-orange-900/20'
//             }
//         };
//         return colors[color] || colors.blue;
//     };

//     if (loading) {
//         return <LoadingSectionData />;
//     }

//     return (
//         <section className="relative py-16 bg-gray-50 dark:bg-gray-900">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Section Header */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                         Medicine Categories
//                     </h2>
//                     <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//                         Browse our comprehensive collection of medicines organized by category
//                     </p>
//                 </div>

//                 {/* Category Cards Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {categories?.map((category, index) => (
//                         <CategoryCard key={category._id} category={category} handleCategoryClick={handleCategoryClick} getColorClasses={getColorClasses} index={index} />
//                     ))}
//                 </div>

//                 {/* Call to Action */}
//                 <div className="text-center mt-12">
//                     <button
//                         onClick={() => navigate('/categories')}
//                         className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
//                     >
//                         Browse All Categories
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default CategoryCards;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import CategoryCard from './CategoryCard';
import axiosInstance from '../../../../api/axiosInstance';
import LoadingSectionData from '../../../../components/ui/Loading/LoadingSectionData';

const CategoryCards = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/categories');
        setCategories(response.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.categoryName.toLowerCase()}`, {
      state: { categoryId: category._id, categoryName: category.categoryName },
    });
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        text: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
      },
      purple: {
        text: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
      },
      green: {
        text: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50 dark:bg-green-900/20',
      },
      red: {
        text: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-50 dark:bg-red-900/20',
      },
      indigo: {
        text: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      },
      orange: {
        text: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
      },
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return <LoadingSectionData />;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Danh mục thuốc
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Khám phá các loại thuốc được sắp xếp theo từng danh mục rõ ràng
          </p>
        </div>

        {/* Grid danh mục */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category, index) => (
            <CategoryCard
              key={category._id}
              category={category}
              handleCategoryClick={handleCategoryClick}
              getColorClasses={getColorClasses}
              index={index}
            />
          ))}
        </div>

        {/* Nút xem thêm */}
        <div className="text-center mt-10">
  <button
    onClick={() => navigate('/categories')}
    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium rounded-lg transition-colors duration-200"
  >
    Xem tất cả danh mục
  </button>
</div>
      </div>
    </section>
  );
};

export default CategoryCards;
