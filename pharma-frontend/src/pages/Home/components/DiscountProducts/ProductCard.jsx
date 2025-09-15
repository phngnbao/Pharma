// import { FaStar, FaStarHalfAlt } from "react-icons/fa"

// import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
// import { useNavigate } from "react-router";

// const ProductCard = ({ product }) => {
//     const navigate = useNavigate();

//     const renderStars = (rating) => {
//         const stars = []
//         const fullStars = Math.floor(rating)
//         const hasHalfStar = rating % 1 !== 0

//         for (let i = 0; i < fullStars; i++) {
//             stars.push(<FaStar key={i} className="text-yellow-400 fill-current" />)
//         }

//         if (hasHalfStar) {
//             stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 fill-current" />)
//         }

//         const remainingStars = 5 - Math.ceil(rating)
//         for (let i = 0; i < remainingStars; i++) {
//             stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />)
//         }

//         return stars
//     }


//     return (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
//             {/* Discount Badge */}
//             <div className="relative">
//                 <div className="absolute top-3 left-3 z-10">
//                     <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
//                         -{product.discount}%
//                     </span>
//                 </div>

//                 {/* Quick Action Buttons */}
//                 <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="flex flex-col space-y-2">
//                         <button className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
//                             <FiHeart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                         </button>
//                         <button
//                             onClick={() => navigate(`/medicine/${product._id}`)}
//                             className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
//                             <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Product Image */}
//                 <div className="h-48 overflow-hidden">
//                     <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                 </div>
//             </div>

//             {/* Product Info */}
//             <div className="p-4">
//                 {/* Brand */}
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.company}</p>

//                 {/* Product Name */}
//                 <h3
//                     onClick={() => navigate(`/medicine/${product._id}`)}
//                     className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
//                 >
//                     {product.name}
//                 </h3>

//                 {/* Rating */}
//                 <div className="flex items-center space-x-1 mb-3">
//                     <div className="flex space-x-1">
//                         {renderStars(product.rating)}
//                     </div>
//                     <span className="text-sm text-gray-600 dark:text-gray-400">
//                         ({product.reviews})
//                     </span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center space-x-2 mb-4">
//                     <span className="text-lg font-bold text-green-600 dark:text-green-400">
//                         ${product.discountPrice}
//                     </span>
//                     <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
//                         ${product.pricePerUnit}
//                     </span>
//                 </div>

//                 {/* Stock Status & Add to Cart */}
//                 <div className="flex items-center justify-between">
//                     <span className={`text-sm font-medium ${product.inStock
//                         ? 'text-green-600 dark:text-green-400'
//                         : 'text-red-500 dark:text-red-400'
//                         }`}>
//                         {product.inStock ? 'In Stock' : 'Out of Stock'}
//                     </span>

//                     <button
//                         disabled={!product.inStock}
//                         className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${product.inStock
//                             ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
//                             : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                             }`}
//                     >
//                         <FiShoppingCart className="w-4 h-4" />
//                         <span className="text-sm font-medium">Add</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductCard;
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { useNavigate } from "react-router"
import addToCart from "../../../../utils/addToCart"
import toast from "react-hot-toast"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />)
    }

    return stars
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Badge giảm giá */}
      <div className="relative">
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-md text-xs font-bold shadow">
            Giảm {product.discount}%
          </span>
        </div>

        {/* Nút hành động nhanh */}
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col space-y-2">
            <button className="bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <FiHeart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => navigate(`/medicine/${product._id}`)}
              className="bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Ảnh sản phẩm */}
        <div className="h-44 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <img
            src={product.imageUrls}
            alt={product.name}
            className="max-h-40 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-4">
        {/* Thương hiệu */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.company}</p>

        {/* Tên sản phẩm */}
        <h3
          onClick={() => navigate(`/medicine/${product._id}`)}
          className="font-semibold text-gray-800 dark:text-white text-sm mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {product.name}
        </h3>

        {/* Đánh giá */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex space-x-1">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Giá */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-base font-bold text-red-600">
            {product.discountPrice.toLocaleString("vi-VN")}₫
          </span>
          <span className="text-sm text-gray-400 line-through">
            {product.pricePerUnit.toLocaleString("vi-VN")}₫
          </span>
        </div>

        {/* Tình trạng & nút mua */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium ${
              product.inStock ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.inStock ? "Còn hàng" : "Hết hàng"}
          </span>

          <button
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              product.inStock
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>Thêm</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
