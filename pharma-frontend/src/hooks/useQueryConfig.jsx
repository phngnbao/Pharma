/**
 * Custom hook that provides common TanStack Query configuration
 * Used across the application for consistent caching and stale time settings
 */
export const useQueryConfig = () => {
    return {
        staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes - data stays in cache for 10 minutes
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        retry: 3, // Retry failed requests 3 times
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    };
};

// Common query keys for consistency across the app
export const queryKeys = {
    categories: ['categories'],
    medicines: ['medicines'],
    medicinesByCategory: (categorySlug) => ['medicines-by-category', categorySlug],
    categoryInfo: (categorySlug) => ['category-info', categorySlug],
    discountProducts: ['discount-products'],
    adminStats: ['admin-stats'],
};
