// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router';
// import { FaUserMd, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
// import axiosInstance from '../../../../api/axiosInstance';

// const HealthBlog = () => {
//     const navigate = useNavigate();
//     const [healthBlogs, setHealthBlogs] = useState([]);

//     useEffect(() => {
//         // Fetch health blogs from the server
//         const fetchHealthBlogs = async () => {
//             try {
//                 const response = await axiosInstance.get('/health-blogs');
//                 setHealthBlogs(response.data.slice(0, 6)); // Limit to 6 posts for preview
//             } catch (error) {
//                 console.error('Failed to fetch health blogs:', error);
//             }
//         };

//         fetchHealthBlogs();
//     }, []);

//     const handleBlogClick = (blogId) => {
//         navigate(`/health-blogs/${blogId}`);
//     };

//     return (
//         <section className="health-blog-section py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
//             <div className="container mx-auto px-4">
//                 {/* Section Header */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
//                         Health & Wellness <span className="text-blue-600 dark:text-blue-400">Insights</span>
//                     </h2>
//                     <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//                         Stay informed with expert advice, medicine guides, and health tips from our certified healthcare professionals
//                     </p>
//                 </div>

//                 {/* Blog Grid */}
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
//                     {healthBlogs.map((post) => (
//                         <div
//                             key={post._id || post.id}
//                             className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700 cursor-pointer"
//                             onClick={() => handleBlogClick(post._id || post.id)}
//                         >
//                             <div className="relative overflow-hidden">
//                                 <img
//                                     src={post.image}
//                                     alt={post.title}
//                                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <div className="absolute top-4 left-4">
//                                     <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
//                                         {post.category}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="p-6">
//                                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                                     {post.title}
//                                 </h3>

//                                 <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
//                                     <div className="flex items-center gap-2">
//                                         <FaUserMd className="text-blue-500 dark:text-blue-400" />
//                                         <span>{post.author}</span>
//                                     </div>
//                                     <div className="flex items-center gap-4">
//                                         <div className="flex items-center gap-1">
//                                             <FaCalendarAlt className="text-green-500 dark:text-green-400" />
//                                             <span>{new Date(post.date).toLocaleDateString()}</span>
//                                         </div>
//                                         <span className="text-blue-500 dark:text-blue-400 font-medium">{post.readTime}</span>
//                                     </div>
//                                 </div>

//                                 <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors group-hover:gap-3">
//                                     Read More <FaArrowRight className="transition-all duration-300" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* View All Button */}
//                 <div className="text-center">
//                     <Link
//                         to="/health-blogs"
//                         className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transform hover:scale-105"
//                     >
//                         View All Health Articles
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HealthBlog;
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FaUserMd, FaCalendarAlt, FaArrowRight } from 'react-icons/fa'
import axiosInstance from '../../../../api/axiosInstance'

const HealthBlog = () => {
  const navigate = useNavigate()
  const [healthBlogs, setHealthBlogs] = useState([])

  useEffect(() => {
    const fetchHealthBlogs = async () => {
      try {
        const response = await axiosInstance.get('/health-blogs')
        setHealthBlogs(response.data.slice(0, 6)) // chỉ lấy 6 bài mới nhất
      } catch (error) {
        console.error('Không thể tải bài viết:', error)
      }
    }

    fetchHealthBlogs()
  }, [])

  const handleBlogClick = (blogId) => {
    navigate(`/health-blogs/${blogId}`)
  }

  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
            Góc Sức Khỏe & Dinh Dưỡng
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cập nhật kiến thức y tế, lời khuyên từ chuyên gia và mẹo chăm sóc sức khỏe mỗi ngày dành cho bạn và gia đình.
          </p>
          <div className="mt-4 w-20 h-1 mx-auto bg-blue-500 rounded-full"></div>
        </div>

        {/* Danh sách bài viết */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {healthBlogs.map((post) => (
            <div
              key={post._id || post.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => handleBlogClick(post._id || post.id)}
            >
              {/* Ảnh */}
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-0.5 rounded-md text-xs font-semibold shadow">
                  {post.category}
                </span>
              </div>

              {/* Nội dung */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                {/* Tác giả + ngày */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <FaUserMd className="text-blue-500" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-green-500" />
                    <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                {/* Thời gian đọc */}
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                  Thời gian đọc: {post.readTime}
                </p>

                {/* Nút xem thêm */}
                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-2 transition-all">
                  Xem chi tiết <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nút xem tất cả */}
        <div className="text-center">
          <Link
            to="/health-blogs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold text-sm md:text-base shadow transition-transform duration-200 hover:scale-105"
          >
            Xem tất cả bài viết
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HealthBlog
