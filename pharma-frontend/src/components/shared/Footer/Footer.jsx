// import React from 'react'
// import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
// import { FaHeart } from 'react-icons/fa'

// const Footer = () => {
//     return (
//         <footer className="print:hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
//             {/* Main Footer Content */}
//             <div className="container mx-auto px-4 py-12">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

//                     {/* Company Info */}
//                     <div className="space-y-4">
//                         <div className="flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
//                                 <FaHeart className="w-5 h-5 text-white" />
//                             </div>
//                             <h3 className="text-2xl font-bold text-gray-800 dark:text-white">MediCare+</h3>
//                         </div>
//                         <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                             Your trusted online pharmacy providing quality medicines, supplements, and healthcare products with fast delivery and expert consultation.
//                         </p>
//                         <div className="space-y-2">
//                             <div className="flex items-center space-x-3">
//                                 <FiPhone className="w-4 h-4 text-blue-500 dark:text-blue-400" />
//                                 <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
//                             </div>
//                             <div className="flex items-center space-x-3">
//                                 <FiMail className="w-4 h-4 text-blue-500 dark:text-blue-400" />
//                                 <span className="text-gray-600 dark:text-gray-300">support@medicare.com</span>
//                             </div>
//                             <div className="flex items-center space-x-3">
//                                 <FiMapPin className="w-4 h-4 text-blue-500 dark:text-blue-400" />
//                                 <span className="text-gray-600 dark:text-gray-300">123 Health Street, Medical City, MC 12345</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Quick Links */}
//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-2">
//                             Quick Links
//                         </h4>
//                         <ul className="space-y-3">
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     About Us
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Our Services
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Online Consultation
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Prescription Upload
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Track Order
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Contact Us
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Categories */}
//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-2">
//                             Product Categories
//                         </h4>
//                         <ul className="space-y-3">
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-green-500 dark:bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Prescription Medicines
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-green-500 dark:bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Vitamins & Supplements
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-green-500 dark:bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Personal Care
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-green-500 dark:bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Baby Care
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-green-500 dark:bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Health Devices
//                                 </a>
//                             </li>
//                             <li>
//                                 <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group">
//                                     <span className="w-1 h-1 bg-green-500 dark:bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                     Ayurvedic Medicine
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Newsletter & Social */}
//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-2">
//                             Stay Connected
//                         </h4>
//                         <p className="text-gray-600 dark:text-gray-300 text-sm">
//                             Subscribe to our newsletter for health tips, exclusive offers, and product updates.
//                         </p>

//                         {/* Newsletter Signup */}
//                         <div className="space-y-3">
//                             <div className="flex">
//                                 <input
//                                     type="email"
//                                     placeholder="Enter your email"
//                                     className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
//                                 />
//                                 <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-r-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
//                                     Subscribe
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Social Media Links */}
//                         <div className="space-y-3">
//                             <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Follow Us</h5>
//                             <div className="flex space-x-3">
//                                 <a
//                                     href="#"
//                                     className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 transition-all duration-200 group shadow-md hover:shadow-lg"
//                                 >
//                                     <FiFacebook className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white" />
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 dark:hover:bg-blue-400 transition-all duration-200 group shadow-md hover:shadow-lg"
//                                 >
//                                     <FiTwitter className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white" />
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 dark:hover:bg-pink-600 transition-all duration-200 group shadow-md hover:shadow-lg"
//                                 >
//                                     <FiInstagram className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white" />
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-700 transition-all duration-200 group shadow-md hover:shadow-lg"
//                                 >
//                                     <FiLinkedin className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white" />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Trust Badges & Certifications */}
//             <div className="border-t border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
//                 <div className="container mx-auto px-4 py-6">
//                     <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
//                         <div className="flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
//                                 <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                             <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">FDA Approved</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
//                                 <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </div>
//                             <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">ISO Certified</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
//                                 <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                             <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Secure Payments</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
//                                 <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
//                                 </svg>
//                             </div>
//                             <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">24/7 Support</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Footer */}
//             <div className="border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
//                 <div className="container mx-auto px-4 py-6">
//                     <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

//                         {/* Copyright */}
//                         <div className="text-center md:text-left">
//                             <p className="text-gray-500 dark:text-gray-400 text-sm">
//                                 © 2025 MediCare+. All rights reserved. |
//                                 <span className="text-blue-600 dark:text-blue-400 font-medium"> Made with ❤️ for better health</span>
//                             </p>
//                         </div>

//                         {/* Legal Links */}
//                         <div className="flex flex-wrap items-center space-x-6 text-sm">
//                             <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
//                                 Privacy Policy
//                             </a>
//                             <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
//                                 Terms of Service
//                             </a>
//                             <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
//                                 Return Policy
//                             </a>
//                             <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
//                                 Shipping Info
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer
import React from 'react'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center">
                            <FaHeart className="text-red-500 mr-2" />
                            PharmaCare
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Nhà thuốc trực tuyến cung cấp sản phẩm chất lượng và dịch vụ tận tâm.
                        </p>
                        <div className="mt-4">
                            <p className="flex items-center">
                                <FiPhone className="mr-2" /> 0975372504
                            </p>
                            <p className="flex items-center">
                                <FiMail className="mr-2" /> suppott@pharmacare.com
                            </p>
                            <p className="flex items-center">
                                <FiMapPin className="mr-2" /> Lavida Plus, Đường Nguyễn Văn Linh, Tân Phong, TP Hồ Chí Minh
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold">Liên Kết Nhanh</h4>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:text-blue-600">Giới thiệu</a></li>
                            <li><a href="#" className="hover:text-blue-600">Dịch vụ</a></li>
                            <li><a href="#" className="hover:text-blue-600">Tư vấn Online</a></li>
                            <li><a href="#" className="hover:text-blue-600">Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold">Danh Mục Sản Phẩm</h4>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:text-green-600">Thuốc theo Đơn</a></li>
                            <li><a href="#" className="hover:text-green-600">Thực phẩm chức năng</a></li>
                            <li><a href="#" className="hover:text-green-600">Chăm sóc sức khỏe</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="font-semibold">Theo dõi chúng tôi</h4>
                        <div className="flex space-x-4 mt-2">
                            <a href="https://www.facebook.com/BaoPham.2402" className="text-gray-600 hover:text-blue-600"><FiFacebook /></a>
                            <a href="#" className="text-gray-600 hover:text-blue-400"><FiTwitter /></a>
                            <a href="https://www.instagram.com/phnbao_/" className="text-gray-600 hover:text-pink-600"><FiInstagram /></a>
                            <a href="#" className="text-gray-600 hover:text-blue-700"><FiLinkedin /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center text-sm">
                    <p>© 2025 PharmaCare. Tất cả quyền được bảo lưu.</p>
                    <div className="space-x-4">
                        <a href="#" className="hover:text-blue-600">Chính sách Bảo mật</a>
                        <a href="#" className="hover:text-blue-600">Điều khoản Dịch vụ</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer