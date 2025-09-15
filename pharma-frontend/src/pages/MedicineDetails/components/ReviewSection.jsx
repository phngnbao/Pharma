import React, { useState } from 'react';
import { FaStar, FaRegStar, FaUser, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const ReviewSection = ({ initialReviews = [] }) => {
    const [reviews, setReviews] = useState(initialReviews);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: '',
        title: ''
    });
    const [showAddReview, setShowAddReview] = useState(false);

    const renderStars = (rating, interactive = false, onRatingChange = null) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    type="button"
                    onClick={() => interactive && onRatingChange && onRatingChange(i)}
                    className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                    disabled={!interactive}
                >
                    {i <= rating ? (
                        <FaStar className="text-yellow-400" />
                    ) : (
                        <FaRegStar className="text-gray-300" />
                    )}
                </button>
            );
        }
        return stars;
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();

        const review = {
            id: Date.now(),
            user: {
                name: 'Current User', // This would come from auth context
                avatar: '/default-avatar.png'
            },
            rating: newReview.rating,
            title: newReview.title,
            comment: newReview.comment,
            date: new Date().toLocaleDateString(),
            helpful: 0,
            notHelpful: 0
        };

        setReviews([review, ...reviews]);
        setNewReview({ rating: 5, comment: '', title: '' });
        setShowAddReview(false);
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const ratingDistribution = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
    };

    return (
        <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center gap-1 mb-2">
                            {renderStars(Math.round(averageRating))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Dựa trên {reviews.length} đánh giá
                        </p>
                    </div>

                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map(rating => (
                            <div key={rating} className="flex items-center gap-2">
                                <span className="text-sm w-8">{rating}★</span>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: reviews.length > 0
                                                ? `${(ratingDistribution[rating] / reviews.length) * 100}%`
                                                : '0%'
                                        }}
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                                    {ratingDistribution[rating]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Review Button */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Đánh giá của khách hàng
                </h3>
                <button
                    onClick={() => setShowAddReview(!showAddReview)}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Viết đánh giá
                </button>
            </div>

            {/* Add Review Form */}
            {showAddReview && (
                <form onSubmit={handleSubmitReview} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Viết đánh giá của bạn
                    </h4>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Đánh giá
                            </label>
                            <div className="flex gap-1">
                                {renderStars(newReview.rating, true, (rating) =>
                                    setNewReview(prev => ({ ...prev, rating }))
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tiêu đề
                            </label>
                            <input
                                type="text"
                                value={newReview.title}
                                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Tóm tắt trải nghiệm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Đánh giá
                            </label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Nói lại về trải nghiệm với thuốc này..."
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Gửi đánh giá
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddReview(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <FaUser className="mx-auto text-4xl mb-4 opacity-50" />
                        <p>Chưa có đánh giá. Hãy là người đầu tiên đánh giá thuốc này!</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start gap-4">
                                <img
                                    src={review.user.avatar}
                                    alt={review.user.name}
                                    className="w-10 h-10 rounded-full"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcuMjM4NiAyMCAyMCAyMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTEwIDMyQzEwIDI3LjU4MTcgMTMuNTgxNyAyNCAxOCAyNEgyMkMyNi40MTgzIDI0IDMwIDI3LjU4MTcgMzAgMzJWMzRIMTBWMzJaIiBmaWxsPSIjOUNBNEFGIi8+Cjwvc3ZnPgo=';
                                    }}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {review.user.name}
                                        </h4>
                                        <div className="flex gap-1">
                                            {renderStars(review.rating)}
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {review.date}
                                        </span>
                                    </div>

                                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                                        {review.title}
                                    </h5>

                                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                                        {review.comment}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                                            <FaThumbsUp />
                                            Hữu ích ({review.helpful})
                                        </button>
                                        <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                            <FaThumbsDown />
                                            Không hữu ích ({review.notHelpful})
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
