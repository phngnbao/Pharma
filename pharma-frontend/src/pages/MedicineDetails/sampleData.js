// Sample medicine data for testing the medicine details page
export const sampleMedicine = {
    _id: "sample-medicine-id",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    description:
        "Paracetamol is a commonly used medicine that can help treat pain and reduce fever. It's typically used to relieve mild or moderate pain, such as headaches, toothache or sprains, and reduce fevers caused by illnesses like colds and flu. Paracetamol is often recommended as one of the first treatments for pain because it's safe for most people to take and side effects are rare.",
    category: "Pain Relief",
    company: "PharmaCorp Ltd.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    pricePerUnit: 25.99,
    discountPrice: 19.99,
    discount: 23,
    massUnit: "500mg",
    stockQuantity: 150,
    inStock: true,
    rating: 4.5,
    reviews: 128,
    seller: {
        displayName: "MediStore Pharmacy",
        email: "contact@medistore.com",
        photoURL:
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop",
    },
};

// Sample related medicines
export const sampleRelatedMedicines = [
    {
        _id: "related-1",
        name: "Ibuprofen 400mg",
        company: "HealthMax",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
        discountPrice: 14.99,
        rating: 4.2,
    },
    {
        _id: "related-2",
        name: "Aspirin 325mg",
        company: "MediPlus",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop",
        discountPrice: 8.99,
        rating: 4.0,
    },
    {
        _id: "related-3",
        name: "Acetaminophen Extra Strength",
        company: "PharmaCorp Ltd.",
        image: "https://images.unsplash.com/photo-1550572017-edd951aa8465?w=400&h=400&fit=crop",
        discountPrice: 22.99,
        rating: 4.7,
    },
    {
        _id: "related-4",
        name: "Naproxen 220mg",
        company: "PainAway",
        image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=400&fit=crop",
        discountPrice: 18.99,
        rating: 4.3,
    },
];
