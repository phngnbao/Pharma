// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import { FaUserMd, FaCalendarAlt, FaClock, FaBookmark, FaShare, FaChevronLeft, FaEye, FaHeart, FaComment } from 'react-icons/fa';
// import { useTitle } from '../../../hooks/useTitle';
// import axiosInstance from '../../../api/axiosInstance';
// import Loading from '../../../components/ui/Loading/Loading';
// import Error from '../../../components/ui/Error/Error';

// const HealthBlogDetails = () => {
//     const { blogId } = useParams();
//     const navigate = useNavigate();

//     // Fetch single blog post
//     const { data: blogPost, isLoading, error } = useQuery({
//         queryKey: ['blogPost', blogId],
//         queryFn: async () => {
//             const response = await axiosInstance.get(`/health-blogs/${blogId}`);
//             return response.data;
//         },
//         staleTime: 5 * 60 * 1000, // 5 minutes
//         cacheTime: 10 * 60 * 1000, // 10 minutes
//     });

//     // Set page title
//     useTitle(blogPost ? `${blogPost.title} - Health Blog` : 'Health Blog Article');

//     // Initialize AOS
//     useEffect(() => {
//         if (typeof window !== 'undefined' && window.AOS) {
//             window.AOS.init({
//                 duration: 800,
//                 easing: 'ease-in-out',
//                 once: true
//             });
//         }
//     }, []);

//     // Handle loading state
//     if (isLoading) {
//         return <Loading />;
//     }

//     // Handle error state
//     if (error) {
//         return (
//             <Error
//                 message="Failed to load blog article"
//                 onRetry={() => window.location.reload()}
//             />
//         );
//     }

//     // Handle not found
//     if (!blogPost) {
//         return (
//             <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="text-6xl mb-4">📝</div>
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Article Not Found</h2>
//                     <p className="text-gray-600 dark:text-gray-400 mb-6">
//                         The blog article you're looking for doesn't exist or has been removed.
//                     </p>
//                     <button
//                         onClick={() => navigate('/health-blogs')}
//                         className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//                     >
//                         Back to Health Blog
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const handleLike = async () => {
//         try {
//             await axiosInstance.post(`/health-blogs/${blogId}/like`);
//             // Refetch the data to update likes count
//             // This will be handled by TanStack Query automatically
//         } catch (error) {
//             console.error('Failed to like the post:', error);
//         }
//     };

//     const handleShare = () => {
//         if (navigator.share) {
//             navigator.share({
//                 title: blogPost.title,
//                 text: blogPost.excerpt,
//                 url: window.location.href,
//             });
//         } else {
//             // Fallback: Copy to clipboard
//             navigator.clipboard.writeText(window.location.href);
//             alert('Link copied to clipboard!');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//             {/* Article Header */}
//             <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
//                 <div className="container mx-auto px-4 py-4">
//                     <button
//                         onClick={() => navigate('/health-blogs')}
//                         className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//                         data-aos="fade-right"
//                     >
//                         <FaChevronLeft /> Back to Health Blog
//                     </button>
//                 </div>
//             </div>

//             {/* Article Content */}
//             <article className="container mx-auto px-4 py-8 max-w-4xl">
//                 {/* Featured Image */}
//                 <div className="mb-8" data-aos="fade-up">
//                     <img
//                         src={blogPost.image}
//                         alt={blogPost.title}
//                         className="w-full h-80 object-cover rounded-xl shadow-lg"
//                     />
//                 </div>

//                 {/* Article Meta */}
//                 <div className="mb-6" data-aos="fade-up" data-aos-delay="200">
//                     <div className="flex items-center gap-4 mb-4">
//                         <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
//                             {blogPost.category}
//                         </span>
//                         {blogPost.featured && (
//                             <span className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//                                 Featured
//                             </span>
//                         )}
//                     </div>

//                     <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                         {blogPost.title}
//                     </h1>

//                     <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
//                         <div className="flex items-center gap-2">
//                             <img
//                                 src={blogPost.authorImage}
//                                 alt={blogPost.author}
//                                 className="w-8 h-8 rounded-full"
//                             />
//                             <span className="font-medium">{blogPost.author}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                             <FaCalendarAlt className="text-green-500" />
//                             <span>{new Date(blogPost.date).toLocaleDateString()}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                             <FaClock className="text-blue-500" />
//                             <span>{blogPost.readTime}</span>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <span className="flex items-center gap-1">
//                                 <FaEye className="text-gray-500" />
//                                 {blogPost.views}
//                             </span>
//                             <span className="flex items-center gap-1">
//                                 <FaHeart className="text-red-500" />
//                                 {blogPost.likes}
//                             </span>
//                             <span className="flex items-center gap-1">
//                                 <FaComment className="text-blue-500" />
//                                 {blogPost.comments}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Article Content */}
//                 <div
//                     className="prose prose-lg dark:prose-invert max-w-none mb-8 text-gray-400"
//                     data-aos="fade-up"
//                     data-aos-delay="400"
//                 >
//                     <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
//                 </div>

//                 {/* Tags */}
//                 <div className="mb-8" data-aos="fade-up" data-aos-delay="600">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
//                     <div className="flex flex-wrap gap-2">
//                         {blogPost.tags?.map((tag, index) => (
//                             <span
//                                 key={index}
//                                 className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer"
//                             >
//                                 #{tag}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Share & Actions */}
//                 <div
//                     className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6"
//                     data-aos="fade-up"
//                     data-aos-delay="800"
//                 >
//                     <div className="flex items-center gap-4">
//                         <button
//                             onClick={handleLike}
//                             className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
//                         >
//                             <FaHeart /> Like ({blogPost.likes})
//                         </button>
//                         <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
//                             <FaBookmark /> Save
//                         </button>
//                         <button
//                             onClick={handleShare}
//                             className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors"
//                         >
//                             <FaShare /> Share
//                         </button>
//                     </div>
//                 </div>

//                 {/* Related Articles Section */}
//                 <div className="mt-16" data-aos="fade-up" data-aos-delay="1000">
//                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h3>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {/* This would be populated with related articles based on category or tags */}
//                         <div className="text-center text-gray-500 dark:text-gray-400 col-span-full">
//                             <p>Related articles coming soon...</p>
//                         </div>
//                     </div>
//                 </div>
//             </article>
//         </div>
//     );
// };

// export default HealthBlogDetails;
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FaUserMd, FaCalendarAlt, FaClock, FaBookmark, FaShare, FaChevronLeft, FaEye, FaHeart, FaComment } from 'react-icons/fa';
import { useTitle } from '../../../hooks/useTitle';
import axiosInstance from '../../../api/axiosInstance';
import Loading from '../../../components/ui/Loading/Loading';
import Error from '../../../components/ui/Error/Error';

const HealthBlogDetails = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();

    // Fetch single blog post
    const { data: blogPost, isLoading, error } = useQuery({
        queryKey: ['blogPost', blogId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/health-blogs/${blogId}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
    });

    // Set page title
    useTitle(blogPost ? `${blogPost.title} - Health Blog` : 'Health Blog Article');

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

    // Handle loading state
    if (isLoading) {
        return <Loading />;
    }

    // Handle error state
    if (error) {
        return (
            <Error
                message="Không thể tải bài viết"
                onRetry={() => window.location.reload()}
            />
        );
    }

    // Handle not found
    if (!blogPost) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bài viết không tồn tại</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                    </p>
                    <button
                        onClick={() => navigate('/health-blogs')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Quay lại blog sức khỏe
                    </button>
                </div>
            </div>
        );
    }

    const handleLike = async () => {
        try {
            await axiosInstance.post(`/health-blogs/${blogId}/like`);
        } catch (error) {
            console.error('Không thể thích bài viết:', error);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: blogPost.title,
                text: blogPost.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Đã sao chép liên kết vào clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Article Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-4">
                    <button
                        onClick={() => navigate('/health-blogs')}
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                        <FaChevronLeft /> Quay lại blog sức khỏe
                    </button>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Featured Image */}
                <div className="mb-8">
                    <img
                        src={blogPost.image}
                        alt={blogPost.title}
                        className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />
                </div>

                {/* Article Meta */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {blogPost.category}
                        </span>
                        {blogPost.featured && (
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Nổi bật
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {blogPost.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <img
                                src={blogPost.authorImage}
                                alt={blogPost.author}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="font-medium">{blogPost.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaCalendarAlt className="text-green-500" />
                            <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaClock className="text-blue-500" />
                            <span>{blogPost.readTime}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <FaEye className="text-gray-500" />
                                {blogPost.views}
                            </span>
                            <span className="flex items-center gap-1">
                                <FaHeart className="text-red-500" />
                                {blogPost.likes}
                            </span>
                            <span className="flex items-center gap-1">
                                <FaComment className="text-blue-500" />
                                {blogPost.comments}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8 text-gray-400">
                    <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                </div>

                {/* Tags */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Thẻ</h3>
                    <div className="flex flex-wrap gap-2">
                        {blogPost.tags?.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Share & Actions */}
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                        >
                            <FaHeart /> Thích ({blogPost.likes})
                        </button>
                        <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                            <FaBookmark /> Lưu
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors"
                        >
                            <FaShare /> Chia sẻ
                        </button>
                    </div>
                </div>

                {/* Related Articles Section */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Bài viết liên quan</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                            <p>Bài viết liên quan sẽ cập nhật sau...</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default HealthBlogDetails;