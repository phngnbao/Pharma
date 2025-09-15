// import React from 'react';
// import { FaShieldAlt, FaCertificate, FaUserMd, FaAward, FaStar } from 'react-icons/fa';
// import { MdLocalPharmacy, MdVerifiedUser } from 'react-icons/md';

// const HealthcarePartners = () => {
//     const partners = [
//         {
//             id: 1,
//             name: "Square Pharmaceuticals",
//             logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop&crop=center",
//             description: "Leading pharmaceutical company in Bangladesh",
//             products: "500+ Products",
//             rating: 4.9,
//             verified: true
//         },
//         {
//             id: 2,
//             name: "Beximco Pharma",
//             logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop&crop=center",
//             description: "Trusted healthcare solutions provider",
//             products: "350+ Products",
//             rating: 4.8,
//             verified: true
//         },
//         {
//             id: 3,
//             name: "Incepta Pharmaceuticals",
//             logo: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=80&h=80&fit=crop&crop=center",
//             description: "Quality medicines at affordable prices",
//             products: "400+ Products",
//             rating: 4.7,
//             verified: true
//         },
//         {
//             id: 4,
//             name: "ACI Healthcare",
//             logo: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=80&h=80&fit=crop&crop=center",
//             description: "Innovation in healthcare delivery",
//             products: "300+ Products",
//             rating: 4.8,
//             verified: true
//         }
//     ];

//     const certifications = [
//         {
//             icon: <FaShieldAlt className="text-3xl text-green-600 dark:text-green-400" />,
//             title: "FDA Approved",
//             description: "All medicines are FDA certified and safe"
//         },
//         {
//             icon: <MdVerifiedUser className="text-3xl text-blue-600 dark:text-blue-400" />,
//             title: "Licensed Sellers",
//             description: "Only verified and licensed pharmacies"
//         },
//         {
//             icon: <FaCertificate className="text-3xl text-purple-600 dark:text-purple-400" />,
//             title: "Quality Assured",
//             description: "100% authentic medicines guaranteed"
//         },
//         {
//             icon: <FaUserMd className="text-3xl text-red-600 dark:text-red-400" />,
//             title: "Expert Consultation",
//             description: "Professional pharmacist guidance available"
//         }
//     ];

//     const stats = [
//         { number: "10,000+", label: "Happy Customers", icon: <FaStar /> },
//         { number: "500+", label: "Partner Pharmacies", icon: <MdLocalPharmacy /> },
//         { number: "50+", label: "Healthcare Brands", icon: <FaAward /> },
//         { number: "99.8%", label: "Customer Satisfaction", icon: <FaShieldAlt /> }
//     ];

//     return (
//         <section className="healthcare-partners-section py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
//             <div className="container mx-auto px-4">
//                 {/* Section Header */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
//                         Trusted <span className="text-green-600 dark:text-green-400">Healthcare Partners</span>
//                     </h2>
//                     <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//                         We collaborate with the most reputable pharmaceutical companies and healthcare providers
//                         to ensure you receive only the highest quality medicines and healthcare products.
//                     </p>
//                 </div>

//                 {/* Trust Indicators */}
//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//                     {certifications.map((cert, index) => (
//                         <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 border border-gray-100 dark:border-gray-700">
//                             <div className="flex justify-center mb-4">
//                                 {cert.icon}
//                             </div>
//                             <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{cert.title}</h3>
//                             <p className="text-gray-600 dark:text-gray-300 text-sm">{cert.description}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Partner Companies */}
//                 <div className="mb-12">
//                     <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Our Partner Companies</h3>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {partners.map((partner) => (
//                             <div key={partner.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl dark:hover:shadow-gray-900/20 transition-all duration-300 group">
//                                 <div className="text-center">
//                                     <div className="relative mb-4">
//                                         <img
//                                             src={partner.logo}
//                                             alt={partner.name}
//                                             className="w-16 h-16 mx-auto object-cover rounded-full group-hover:scale-110 transition-transform duration-300 border-2 border-gray-200 dark:border-gray-600"
//                                         />
//                                         {partner.verified && (
//                                             <div className="absolute -top-2 -right-2 bg-green-500 dark:bg-green-400 text-white rounded-full p-1 shadow-md">
//                                                 <MdVerifiedUser className="text-sm" />
//                                             </div>
//                                         )}
//                                     </div>

//                                     <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{partner.name}</h4>
//                                     <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{partner.description}</p>

//                                     <div className="flex items-center justify-between text-sm">
//                                         <span className="text-blue-600 dark:text-blue-400 font-medium">{partner.products}</span>
//                                         <div className="flex items-center gap-1">
//                                             <FaStar className="text-yellow-400 text-xs" />
//                                             <span className="text-gray-700 dark:text-gray-300 font-medium">{partner.rating}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Statistics */}
//                 <div className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-700 dark:to-green-700 rounded-2xl p-8 text-white shadow-xl">
//                     <div className="text-center mb-8">
//                         <h3 className="text-2xl font-bold mb-2">Why Choose Our Platform?</h3>
//                         <p className="text-blue-100 dark:text-blue-200">Trusted by thousands of customers across the country</p>
//                     </div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {stats.map((stat, index) => (
//                             <div key={index} className="text-center">
//                                 <div className="flex justify-center mb-3 text-2xl text-blue-200 dark:text-blue-300">
//                                     {stat.icon}
//                                 </div>
//                                 <div className="text-3xl font-bold mb-1">{stat.number}</div>
//                                 <div className="text-blue-100 dark:text-blue-200 text-sm">{stat.label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Call to Action */}
//                 <div className="text-center mt-12">
//                     <div className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-xl p-8 shadow-lg">
//                         <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
//                             Ready to Join Our Healthcare Community?
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
//                             Experience the convenience of ordering medicines online with guaranteed quality,
//                             fast delivery, and professional support from certified healthcare providers.
//                         </p>
//                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                             <button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
//                                 Browse Medicines
//                             </button>
//                             <button className="border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md">
//                                 Become a Partner
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HealthcarePartners;
import React from 'react';
import { FaShieldAlt, FaCertificate, FaUserMd, FaAward, FaStar } from 'react-icons/fa';
import { MdLocalPharmacy, MdVerifiedUser } from 'react-icons/md';

const HealthcarePartners = () => {
    const partners = [
        {
            id: 1,
            name: "Traphaco",
            logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop&crop=center",
            description: "Công ty dược phẩm hàng đầu Việt Nam",
            products: "800+ sản phẩm",
            rating: 4.9,
            verified: true,
            specialty: "Dược phẩm tổng hợp"
        },
        {
            id: 2,
            name: "Hậu Giang Pharma",
            logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop&crop=center",
            description: "Nhà sản xuất thuốc uy tín từ 1974",
            products: "650+ sản phẩm",
            rating: 4.8,
            verified: true,
            specialty: "Thuốc kháng sinh & tim mạch"
        },
        {
            id: 3,
            name: "Dược Hậu Giang",
            logo: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=80&h=80&fit=crop&crop=center",
            description: "Chuyên sản xuất thuốc từ thảo dược",
            products: "450+ sản phẩm",
            rating: 4.7,
            verified: true,
            specialty: "Y học cổ truyền"
        },
        {
            id: 4,
            name: "Imexpharm",
            logo: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=80&h=80&fit=crop&crop=center",
            description: "Dược phẩm xuất nhập khẩu hàng đầu",
            products: "550+ sản phẩm",
            rating: 4.8,
            verified: true,
            specialty: "Thuốc nhập khẩu cao cấp"
        },
        {
            id: 5,
            name: "Domesco",
            logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=80&h=80&fit=crop&crop=center",
            description: "Công ty dược - vật tư y tế Đồng Nai",
            products: "400+ sản phẩm",
            rating: 4.6,
            verified: true,
            specialty: "Vật tư y tế & dược phẩm"
        },
        {
            id: 6,
            name: "Bidiphar",
            logo: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=80&h=80&fit=crop&crop=center",
            description: "Dược phẩm Bình Định - 50 năm uy tín",
            products: "350+ sản phẩm",
            rating: 4.7,
            verified: true,
            specialty: "Thuốc điều trị chuyên khoa"
        },
        {
            id: 7,
            name: "Stella Pharmaceutical",
            logo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=center",
            description: "Công ty dược phẩm Stella Việt Nam",
            products: "300+ sản phẩm",
            rating: 4.5,
            verified: true,
            specialty: "Thuốc OTC & thực phẩm chức năng"
        },
        {
            id: 8,
            name: "Pharmedic",
            logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&h=80&fit=crop&crop=center",
            description: "Chuyên phân phối thuốc chất lượng cao",
            products: "600+ sản phẩm",
            rating: 4.6,
            verified: true,
            specialty: "Phân phối dược phẩm"
        }
    ];

    const certifications = [
        {
            icon: <FaShieldAlt className="text-3xl text-green-600 dark:text-green-400" />,
            title: "Chứng nhận FDA",
            description: "Tất cả sản phẩm đạt chuẩn FDA, an toàn tuyệt đối"
        },
        {
            icon: <MdVerifiedUser className="text-3xl text-blue-600 dark:text-blue-400" />,
            title: "Nhà thuốc được cấp phép",
            description: "Chỉ hợp tác với các đơn vị uy tín, có giấy phép"
        },
        {
            icon: <FaCertificate className="text-3xl text-purple-600 dark:text-purple-400" />,
            title: "Đảm bảo chất lượng",
            description: "100% sản phẩm chính hãng, có nguồn gốc rõ ràng"
        },
        {
            icon: <FaUserMd className="text-3xl text-red-600 dark:text-red-400" />,
            title: "Tư vấn chuyên môn",
            description: "Dược sĩ chuyên nghiệp luôn sẵn sàng hỗ trợ"
        }
    ];

    const stats = [
        { number: "10.000+", label: "Khách hàng hài lòng", icon: <FaStar /> },
        { number: "500+", label: "Nhà thuốc đối tác", icon: <MdLocalPharmacy /> },
        { number: "50+", label: "Thương hiệu y tế", icon: <FaAward /> },
        { number: "99.8%", label: "Mức độ hài lòng", icon: <FaShieldAlt /> }
    ];

    return (
        <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Đối tác <span className="text-green-600 dark:text-green-400">Y tế Tin cậy</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Chúng tôi hợp tác cùng các công ty dược phẩm và nhà cung cấp dịch vụ y tế uy tín
                        để mang đến cho bạn sản phẩm chất lượng, an toàn và đáng tin cậy.
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {certifications.map((cert, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-center mb-4">
                                {cert.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{cert.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{cert.description}</p>
                        </div>
                    ))}
                </div>

                {/* Partner Companies */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Đối tác của chúng tôi</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {partners.map((partner) => (
                            <div key={partner.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                                <div className="text-center">
                                    <div className="relative mb-4">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="w-16 h-16 mx-auto object-cover rounded-full group-hover:scale-110 transition-transform duration-300 border-2 border-gray-200 dark:border-gray-600"
                                        />
                                        {partner.verified && (
                                            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
                                                <MdVerifiedUser className="text-sm" />
                                            </div>
                                        )}
                                    </div>

                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{partner.name}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{partner.description}</p>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-blue-600 dark:text-blue-400 font-medium">{partner.products}</span>
                                        <div className="flex items-center gap-1">
                                            <FaStar className="text-yellow-400 text-xs" />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">{partner.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistics */}
                <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Vì sao chọn chúng tôi?</h3>
                        <p className="text-blue-100 dark:text-blue-200">Được hàng ngàn khách hàng trên cả nước tin dùng</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-3 text-2xl text-blue-200 dark:text-blue-300">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                                <div className="text-blue-100 dark:text-blue-200 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HealthcarePartners;
