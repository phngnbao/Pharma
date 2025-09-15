// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useTitle } from '../../hooks/useTitle';
// import axiosInstance from '../../api/axiosInstance';
// import Loading from '../../components/ui/Loading/Loading';
// import Error from '../../components/ui/Error/Error';
// import HealthBlogCard from './components/HealthBlogCard';
// import HealthBlogFilters from './components/HealthBlogFilters';
// import HealthBlogPagination from './components/HealthBlogPagination';
// import HealthBlogNewsletter from './components/HealthBlogNewsletter';

// const HealthBlog = () => {
//     useTitle('Health Blog - Expert Health Tips & Medicine Guides');

//     const [filteredPosts, setFilteredPosts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const postsPerPage = 6;

//     // Fetch blog posts using TanStack Query
//     const { data: blogPosts = [], isLoading, error } = useQuery({
//         queryKey: ['blogPosts'],
//         queryFn: async () => {
//             const response = await axiosInstance.get('/health-blogs');
//             return response.data;
//         },
//         staleTime: 5 * 60 * 1000,
//         cacheTime: 10 * 60 * 1000,
//     });

//     // Get unique categories
//     const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

//     // Filter posts based on category and search term
//     useEffect(() => {
//         let filtered = blogPosts;

//         if (selectedCategory !== 'All') {
//             filtered = filtered.filter(post => post.category === selectedCategory);
//         }

//         if (searchTerm) {
//             filtered = filtered.filter(post =>
//                 post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//             );
//         }

//         setFilteredPosts(filtered);
//         setCurrentPage(1);
//     }, [selectedCategory, searchTerm, blogPosts]);

//     // Pagination logic
//     const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
//     const startIndex = (currentPage - 1) * postsPerPage;
//     const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

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
//                 message="Failed to load health blog articles"
//                 onRetry={() => window.location.reload()}
//             />
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-700 dark:to-green-700 text-white py-16">
//                 <div className="container mx-auto px-4 text-center">
//                     <h1 className="text-5xl font-bold mb-4" data-aos="fade-up">
//                         Health & Wellness Blog
//                     </h1>
//                     <p className="text-xl opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
//                         Expert insights, medication guides, and health tips from certified healthcare professionals
//                     </p>
//                 </div>
//             </div>

//             {/* Search and Filters */}
//             <HealthBlogFilters
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 selectedCategory={selectedCategory}
//                 setSelectedCategory={setSelectedCategory}
//                 categories={categories}
//             />

//             {/* Main Content */}
//             <div className="container mx-auto px-4 py-12">
//                 {/* Featured Posts */}
//                 {selectedCategory === 'All' && !searchTerm && (
//                     <div className="mb-12">
//                         <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-aos="fade-up">
//                             Featured Articles
//                         </h2>
//                         <div className="grid lg:grid-cols-2 gap-8">
//                             {blogPosts.filter(post => post.featured).slice(0, 2).map((post) => (
//                                 <HealthBlogCard
//                                     key={post._id || post.id}
//                                     post={post}
//                                     featured={true}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* All Posts Grid */}
//                 <div className="mb-8">
//                     <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-aos="fade-up">
//                         {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
//                         <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
//                             ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
//                         </span>
//                     </h2>

//                     {currentPosts.length > 0 ? (
//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {currentPosts.map((post, index) => (
//                                 <HealthBlogCard
//                                     key={post._id || post.id}
//                                     post={post}
//                                     index={index}
//                                 />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-16">
//                             <div className="text-6xl mb-4">📝</div>
//                             <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
//                             <p className="text-gray-600 dark:text-gray-400 mb-6">
//                                 Try adjusting your search criteria or browse different categories.
//                             </p>
//                             <button
//                                 onClick={() => {
//                                     setSearchTerm('');
//                                     setSelectedCategory('All');
//                                 }}
//                                 className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//                             >
//                                 Show All Articles
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 {/* Pagination */}
//                 <HealthBlogPagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     setCurrentPage={setCurrentPage}
//                 />
//             </div>

//             {/* Newsletter Section */}
//             <HealthBlogNewsletter />
//         </div>
//     );
// };

// export default HealthBlog;
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTitle } from '../../hooks/useTitle';
import axiosInstance from '../../api/axiosInstance';
import Loading from '../../components/ui/Loading/Loading';
import Error from '../../components/ui/Error/Error';
import HealthBlogCard from './components/HealthBlogCard';
import HealthBlogFilters from './components/HealthBlogFilters';
import HealthBlogPagination from './components/HealthBlogPagination';
import HealthBlogNewsletter from './components/HealthBlogNewsletter';

const HealthBlog = () => {
    useTitle('Blog Sức Khỏe - Lời Khuyên và Hướng Dẫn');

    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Fetch blog posts using TanStack Query
    const { data: blogPosts = [], isLoading, error } = useQuery({
        queryKey: ['blogPosts'],
        queryFn: async () => {
            const response = await axiosInstance.get('/health-blogs');
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    // Get unique categories
    const categories = ['Tất cả', ...new Set(blogPosts.map(post => post.category))];

    // Filter posts based on category and search term
    useEffect(() => {
        let filtered = blogPosts;

        if (selectedCategory !== 'Tất cả') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredPosts(filtered);
        setCurrentPage(1);
    }, [selectedCategory, searchTerm, blogPosts]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

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
                message="Không thể tải bài viết sức khỏe"
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4" data-aos="fade-up">
                        Blog Sức Khỏe & Lời Khuyên
                    </h1>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Khám phá thông tin sức khỏe và hướng dẫn sử dụng thuốc từ các chuyên gia.
                    </p>
                </div>
            </div>

            {/* Search and Filters */}
            <HealthBlogFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Featured Posts */}
                {selectedCategory === 'Tất cả' && !searchTerm && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" data-aos="fade-up">
                            Bài Viết Nổi Bật
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-6">
                            {blogPosts.filter(post => post.featured).slice(0, 2).map((post) => (
                                <HealthBlogCard
                                    key={post._id || post.id}
                                    post={post}
                                    featured={true}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* All Posts Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" data-aos="fade-up">
                        {selectedCategory === 'Tất cả' ? 'Bài Viết Mới Nhất' : `${selectedCategory} Bài Viết`}
                        <span className="text-md font-normal text-gray-500 dark:text-gray-400 ml-2">
                            ({filteredPosts.length} {filteredPosts.length === 1 ? 'bài viết' : 'bài viết'})
                        </span>
                    </h2>

                    {currentPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentPosts.map((post, index) => (
                                <HealthBlogCard
                                    key={post._id || post.id}
                                    post={post}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Không tìm thấy bài viết</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Hãy thử điều chỉnh các tiêu chí tìm kiếm của bạn hoặc duyệt các danh mục khác.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('Tất cả');
                                }}
                                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Hiển Thị Tất Cả Bài Viết
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <HealthBlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            {/* Newsletter Section */}
            <HealthBlogNewsletter />
        </div>
    );
};

export default HealthBlog;