// import React from 'react';
// import { useNavigate } from 'react-router';
// import { FaUserMd, FaCalendarAlt, FaClock, FaEye, FaHeart, FaComment, FaChevronRight } from 'react-icons/fa';

// const HealthBlogCard = ({ post, featured = false, index = 0 }) => {
//     const navigate = useNavigate();

//     const handleCardClick = () => {
//         navigate(`/health-blogs/${post._id || post.id}`);
//     };

//     if (featured) {
//         return (
//             <article
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all duration-300 overflow-hidden cursor-pointer group"
//                 onClick={handleCardClick}
//                 data-aos="fade-up"
//             >
//                 <div className="relative">
//                     <img
//                         src={post.image}
//                         alt={post.title}
//                         className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute top-4 left-4">
//                         <span className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
//                             Featured
//                         </span>
//                     </div>
//                     <div className="absolute top-4 right-4">
//                         <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
//                             {post.category}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="p-6">
//                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                         {post.title}
//                     </h3>

//                     <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
//                         {post.excerpt}
//                     </p>

//                     <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
//                         <div className="flex items-center gap-2">
//                             <img
//                                 src={post.authorImage}
//                                 alt={post.author}
//                                 className="w-6 h-6 rounded-full"
//                             />
//                             <span>{post.author}</span>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <span className="flex items-center gap-1">
//                                 <FaCalendarAlt className="text-green-500" />
//                                 {new Date(post.date).toLocaleDateString()}
//                             </span>
//                             <span className="flex items-center gap-1">
//                                 <FaClock className="text-blue-500" />
//                                 {post.readTime}
//                             </span>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
//                             <span className="flex items-center gap-1">
//                                 <FaEye /> {post.views}
//                             </span>
//                             <span className="flex items-center gap-1">
//                                 <FaHeart className="text-red-500" /> {post.likes}
//                             </span>
//                             <span className="flex items-center gap-1">
//                                 <FaComment className="text-blue-500" /> {post.comments}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </article>
//         );
//     }

//     return (
//         <article
//             className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 dark:border-gray-700"
//             onClick={handleCardClick}
//             data-aos="fade-up"
//             data-aos-delay={index * 100}
//         >
//             <div className="relative">
//                 <img
//                     src={post.image}
//                     alt={post.title}
//                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-4 left-4">
//                     <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
//                         {post.category}
//                     </span>
//                 </div>
//                 {post.featured && (
//                     <div className="absolute top-4 right-4">
//                         <span className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
//                             Featured
//                         </span>
//                     </div>
//                 )}
//             </div>

//             <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                     {post.title}
//                 </h3>

//                 <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
//                     {post.excerpt}
//                 </p>

//                 <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
//                     <div className="flex items-center gap-2">
//                         <img
//                             src={post.authorImage}
//                             alt={post.author}
//                             className="w-5 h-5 rounded-full"
//                         />
//                         <span className="text-xs">{post.author}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <span className="flex items-center gap-1 text-xs">
//                             <FaCalendarAlt className="text-green-500" />
//                             {new Date(post.date).toLocaleDateString()}
//                         </span>
//                         <span className="flex items-center gap-1 text-xs">
//                             <FaClock className="text-blue-500" />
//                             {post.readTime}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
//                     <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
//                         <span className="flex items-center gap-1">
//                             <FaEye /> {post.views}
//                         </span>
//                         <span className="flex items-center gap-1">
//                             <FaHeart className="text-red-500" /> {post.likes}
//                         </span>
//                         <span className="flex items-center gap-1">
//                             <FaComment className="text-blue-500" /> {post.comments}
//                         </span>
//                     </div>

//                     <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
//                         Read More <FaChevronRight className="text-xs" />
//                     </div>
//                 </div>
//             </div>
//         </article>
//     );
// };

// export default HealthBlogCard;
import React from 'react';
import { useNavigate } from 'react-router';
import { FaUserMd, FaCalendarAlt, FaClock, FaEye, FaHeart, FaComment, FaChevronRight } from 'react-icons/fa';
import CloudinaryImage from '../../../components/ui/CloudinaryImage/CloudinaryImage';

const HealthBlogCard = ({ post, featured = false, index = 0 }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/health-blogs/${post._id || post.id}`);
    };

    return (
        <article
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group border border-gray-200"
            onClick={handleCardClick}
            data-aos="fade-up"
            data-aos-delay={featured ? 0 : index * 100}
        >
            <div className="relative">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                        {post.category}
                    </span>
                </div>
                {featured && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                            Nổi bật
                        </span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-2">
                        <CloudinaryImage
                            src={post.authorImage}
                            alt={post.author}
                            className="w-5 h-5 rounded-full"
                            fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&size=40&background=3b82f6&color=fff`}
                        />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-gray-500" />
                            {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaClock className="text-gray-500" />
                            {post.readTime}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <FaEye /> {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaHeart className="text-red-500" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaComment className="text-blue-500" /> {post.comments}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                        Đọc thêm <FaChevronRight className="text-xs" />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default HealthBlogCard;