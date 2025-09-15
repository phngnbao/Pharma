import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchFilter from './components/SearchFilter/SearchFilter';
import MedicineTable from './components/MedicineTable/MedicineTable';
import Pagination from './components/Pagination/Pagination';
import MedicineDetailModal from './components/MedicineModal/MedicineDetailModal';
import Loading from '../../components/ui/Loading/Loading';
import axiosInstance from '../../api/axiosInstance';
import { useQueryConfig, queryKeys } from '../../hooks/useQueryConfig';
import { useTitle, PAGE_TITLES } from '../../hooks/useTitle';
import ErrorDataFetching from '../../components/ui/Error/ErrorDataFetching';

const Shop = () => {
    useTitle(PAGE_TITLES.SHOP);
    const queryConfig = useQueryConfig();
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Fetch medicines using TanStack Query
    const {
        data: medicines = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: queryKeys.medicines,
        queryFn: async () => {
            const response = await axiosInstance.get('/medicines');
            return response.data;
        },
        ...queryConfig,
    });

    // Filter and search functionality
    useEffect(() => {
        let filtered = medicines;

        // Filter by category
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(medicine => medicine.categoryName === categoryFilter || medicine.category === categoryFilter);
        }

        // Search functionality
        if (searchTerm) {
            filtered = filtered.filter(medicine =>
                medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort functionality
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredMedicines(filtered);
        setCurrentPage(1);
    }, [medicines, searchTerm, sortBy, sortOrder, categoryFilter]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

    // Handle view details
    const handleViewDetails = (medicine) => {
        setSelectedMedicine(medicine);
        setShowModal(true);
    };

    // Calculate discounted price
    const getDiscountedPrice = (price, discount) => {
        return discount > 0 ? price - (price * discount / 100) : price;
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle modal close
    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMedicine(null);
    };

    // Loading state
    if (isLoading) {
        return <Loading />;
    }

    // Error state
    if (error) {
        return <ErrorDataFetching error={error} refetch={refetch} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Pharma Shop
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Duyệt và mua hàng các loại thuốc từ bộ sưu tập rộng rãi
                    </p>
                </div>

                {/* Search and Filters */}
                <SearchFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />

                {/* Medicine Table */}
                <div className="mb-6">
                    <MedicineTable
                        medicines={currentItems}
                        onViewDetails={handleViewDetails}
                        getDiscountedPrice={getDiscountedPrice}
                    />

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredMedicines.length}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {/* Medicine Details Modal */}
            <MedicineDetailModal
                isOpen={showModal}
                medicine={selectedMedicine}
                onClose={handleModalClose}
                getDiscountedPrice={getDiscountedPrice}
            />
        </div>
    );
};

export default Shop;
