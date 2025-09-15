import React, { useState, useMemo, useEffect } from 'react';
import {
    FaSearch,
    FaFilter,
    FaEye,
    FaCheckCircle,
    FaBullhorn,
    FaCalendarAlt,
    FaDollarSign,
    FaExternalLinkAlt
} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../api/axiosInstance';
import { useAuth } from '../../../../../hooks/useAuth';
import Loading from '../../../../../components/ui/Loading/Loading';
import CloudinaryImage from '../../../../../components/ui/CloudinaryImage/CloudinaryImage';

const AdvertisementView = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);

    // Fetch active advertisements
    const { data: advertisements, isLoading } = useQuery({
        queryKey: ['active-advertisements'],
        queryFn: async () => {
            const response = await axiosInstance.get('/advertise-requests/active');
            return response.data;
        }
    });

    // Fetch categories for filtering
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axiosInstance.get('/categories');
            return response.data;
        }
    });

    // Filter advertisements based on search and category
    const filteredAds = useMemo(() => {
        if (!advertisements) return [];

        return advertisements.filter(ad => {
            const matchesSearch =
                ad.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.medicineName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = categoryFilter === 'all' || ad.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    }, [advertisements, searchTerm, categoryFilter]);

    // Handle view advertisement details
    const handleViewDetails = (ad) => {
        setSelectedAd(ad);
        setShowDetailModal(true);
        
        // Record impression if needed
        // This would typically be handled by the backend
        // axiosInstance.post(`/advertise-requests/${ad._id}/impression`);
    };

    // Handle click on advertisement
    const handleAdClick = async (ad) => {
        try {
            // Record click
            await axiosInstance.post(`/advertise-requests/${ad._id}/click`, {
                userId: user?.email
            });
            
            // Redirect to medicine details page
            window.open(`/medicine/${ad.medicineId}`, '_blank');
        } catch (error) {
            console.error('Error recording ad click:', error);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 md:mb-0">
                    <FaBullhorn className="text-blue-500" /> Quảng Cáo Nổi Bật
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm quảng cáo..."
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    
                    {/* Category Filter */}
                    <div className="relative">
                        <select
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none w-full"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">Tất cả danh mục</option>
                            {categories?.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Advertisement Grid */}
            {filteredAds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAds.map((ad) => (
                        <div key={ad._id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                            {/* Ad Image */}
                            <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                {ad.medicineImage ? (
                                    <CloudinaryImage
                                        src={ad.medicineImage}
                                        alt={ad.medicineName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                                        <FaBullhorn className="text-4xl text-gray-400 dark:text-gray-500" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    Quảng Cáo
                                </div>
                            </div>
                            
                            {/* Ad Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                                    {ad.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                    {ad.description}
                                </p>
                                
                                {/* Ad Details */}
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    <FaCalendarAlt className="mr-1" />
                                    <span className="mr-3">{formatDate(ad.startDate)}</span>
                                    <FaDollarSign className="mr-1" />
                                    <span>{ad.medicineName}</span>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleViewDetails(ad)}
                                        className="flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                    >
                                        <FaEye className="mr-1" /> Chi tiết
                                    </button>
                                    <button
                                        onClick={() => handleAdClick(ad)}
                                        className="flex items-center text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium"
                                    >
                                        <FaExternalLinkAlt className="mr-1" /> Xem sản phẩm
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <FaBullhorn className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm || categoryFilter !== 'all'
                            ? 'Không tìm thấy quảng cáo phù hợp với bộ lọc của bạn.'
                            : 'Hiện không có quảng cáo nào đang hoạt động.'}
                    </p>
                </div>
            )}

            {/* Advertisement Detail Modal */}
            {showDetailModal && selectedAd && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                    {selectedAd.title}
                                </h3>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Ad Image */}
                            <div className="mb-6 rounded-lg overflow-hidden">
                                {selectedAd.medicineImage ? (
                                    <CloudinaryImage
                                        src={selectedAd.medicineImage}
                                        alt={selectedAd.medicineName}
                                        className="w-full h-64 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                        <FaBullhorn className="text-5xl text-gray-400 dark:text-gray-500" />
                                    </div>
                                )}
                            </div>

                            {/* Ad Details */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sản phẩm</h4>
                                    <p className="text-gray-800 dark:text-white">{selectedAd.medicineName}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Mô tả</h4>
                                    <p className="text-gray-800 dark:text-white">{selectedAd.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ngày bắt đầu</h4>
                                        <p className="text-gray-800 dark:text-white">{formatDate(selectedAd.startDate)}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ngày kết thúc</h4>
                                        <p className="text-gray-800 dark:text-white">{formatDate(selectedAd.endDate)}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Người bán</h4>
                                    <p className="text-gray-800 dark:text-white">{selectedAd.sellerName}</p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => {
                                        handleAdClick(selectedAd);
                                        setShowDetailModal(false);
                                    }}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <FaExternalLinkAlt /> Xem chi tiết sản phẩm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvertisementView;