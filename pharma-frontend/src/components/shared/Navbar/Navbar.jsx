// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router';
// import {
//   FaShoppingCart,
//   FaUser,
//   FaBars,
//   FaTimes,
//   FaSignOutAlt,
//   FaUserEdit,
//   FaTachometerAlt,
//   FaGlobe,
//   FaChevronDown
// } from 'react-icons/fa';
// import { AuthContext } from '../../../context/AuthContext';
// import useTheme from '../../../hooks/useTheme';
// import { getCartItems } from '../../../utils/addToCart';

// const Navbar = () => {
//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState('EN');
//   const navigate = useNavigate();

//   const languages = [
//     { code: 'EN', name: 'English' },
//     { code: 'BN', name: 'বাংলা' },
//     { code: 'ES', name: 'Español' },
//     { code: 'FR', name: 'Français' }
//   ];

//   const handleLogout = async () => {
//     try {
//       await logout();
//       setIsProfileDropdownOpen(false);
//       navigate('/');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeDropdowns = () => {
//     setIsProfileDropdownOpen(false);
//     setIsLanguageDropdownOpen(false);
//   };

//   // Cart items count
//   const cartCount = getCartItems().length;


//   return (
//     <nav className="print:hidden bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo and Brand */}
//           <div className="flex items-center space-x-3">
//             <Link to="/" className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">M</span>
//               </div>
//               <span className="hidden lg:inline-block text-xl font-bold text-gray-800 dark:text-white">
//                 MediStore
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link
//               to="/"
//               className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
//             >
//               Home
//             </Link>
//             <Link
//               to="/shop"
//               className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
//             >
//               Shop
//             </Link>
//             <Link
//               to="/categories"
//               className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
//             >
//               Categories
//             </Link>
//           </div>





//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-4">
            
//             {/* Language Dropdown */}
//             <div className="hidden lg:block relative">
//               <button
//                 onClick={() => {
//                   setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
//                   setIsProfileDropdownOpen(false);
//                 }}
//                 className="flex items-center space-x-1 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
//               >
//                 <FaGlobe className="w-5 h-5" />
//                 <span className="text-sm font-medium">{selectedLanguage}</span>
//                 <FaChevronDown className="w-3 h-3" />
//               </button>

//               {isLanguageDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
//                   {languages.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => {
//                         setSelectedLanguage(lang.code);
//                         setIsLanguageDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       {lang.name}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Theme Toggle */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
//             >
//               {theme === 'dark' ? '🌞' : '🌙'}
//             </button>

//             {/* Cart Icon */}
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
//             >
//               <FaShoppingCart className="w-6 h-6" />
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             </Link>





//             {/* User Authentication */}
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//                     setIsLanguageDropdownOpen(false);
//                   }}
//                   className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//                 >
//                   {user.photoURL ? (
//                     <img
//                       src={user.photoURL}
//                       alt={user.displayName || 'User'}
//                       className="w-8 h-8 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
//                       <FaUser className="w-4 h-4 text-white" />
//                     </div>
//                   )}
//                   <FaChevronDown className="w-3 h-3 text-gray-500" />
//                 </button>

//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
//                     <div className="px-4 py-2 border-b dark:border-gray-700">
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">
//                         {user.displayName || 'User'}
//                       </p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {user.email}
//                       </p>
//                     </div>
//                     <Link
//                       to="/update-profile"
//                       onClick={closeDropdowns}
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       <FaUserEdit className="w-4 h-4 mr-2" />
//                       Update Profile
//                     </Link>
//                     <Link
//                       to={user.role === 'admin' ? '/dashboard/admin' : user.role === 'seller' ? '/dashboard/seller' : '/dashboard'}
//                       onClick={closeDropdowns}
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       <FaTachometerAlt className="w-4 h-4 mr-2" />
//                       {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'seller' ? 'Seller Dashboard' : 'Dashboard'}
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//                     >
//                       <FaSignOutAlt className="w-4 h-4 mr-2" />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/auth/login"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
//               >
//                 Join Us
//               </Link>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={toggleMenu}
//               className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
//             >
//               {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t dark:border-gray-700 py-4">
//             <div className="flex flex-col space-y-4">
//               <Link
//                 to="/"
//                 onClick={toggleMenu}
//                 className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/shop"
//                 onClick={toggleMenu}
//                 className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
//               >
//                 Shop
//               </Link>
//               <Link
//                 to="/categories"
//                 onClick={toggleMenu}
//                 className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
//               >
//                 Categories
//               </Link>
//               {!user && (
//                 <Link
//                   to="/auth/login"
//                   onClick={toggleMenu}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 text-center"
//                 >
//                   Join Us
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Overlay for closing dropdowns */}
//       {(isProfileDropdownOpen || isLanguageDropdownOpen) && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={closeDropdowns}
//         ></div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserEdit,
  FaTachometerAlt,
  FaChevronDown,
  FaHome,
  FaStore
} from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import { getCartItems } from '../../../utils/addToCart';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeDropdowns = () => {
    setIsProfileDropdownOpen(false);
  };

  // Cart items count
  const cartCount = getCartItems().length;

  return (
    <nav className="print:hidden bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                 <span className="text-white font-bold text-xl">+</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden lg:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  PharmaCare
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Đối tác sức khỏe của bạn
                </p>
              </div>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="group relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <div className="flex items-center space-x-2">
                <FaHome className="w-4 h-4" />
                <span>Trang chủ</span>
              </div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </Link>
            <Link
              to="/shop"
              className="group relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <div className="flex items-center space-x-2">
                <FaStore className="w-4 h-4" />
                <span>Shop</span>
              </div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </Link>
          </div>

          {/* Enhanced Right Side Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Enhanced Cart Icon */}
            <Link
              to="/cart"
              className="group relative p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
            >
              <FaShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Enhanced User Authentication */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  }}
                  className="group flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className="relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <FaUser className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.role}
                    </p>
                  </div>
                  <FaChevronDown className="w-3 h-3 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                </button>

                {isProfileDropdownOpen && (
                  <>
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 py-2 z-50 backdrop-blur-sm">
                      <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName || 'User'}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                              <FaUser className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {user.displayName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                              {user.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/update-profile"
                          onClick={closeDropdowns}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
                        >
                          <FaUserEdit className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                          Update Profile
                        </Link>
                        <Link
                          to={user.role === 'admin' ? '/dashboard/admin' : user.role === 'seller' ? '/dashboard/seller' : '/dashboard'}
                          onClick={closeDropdowns}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 group"
                        >
                          <FaTachometerAlt className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                          {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'seller' ? 'Seller Dashboard' : 'Dashboard'}
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-200/50 dark:border-gray-700/50 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                        >
                          <FaSignOutAlt className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                          Logout
                        </button>
                      </div>
                    </div>
                    <div className="fixed inset-0 z-40" onClick={closeDropdowns}></div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="group relative bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Đăng nhập</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )}

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <FaBars className="w-6 h-6" />
                </div>
                <div className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
                  <FaTimes className="w-6 h-6" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={toggleMenu}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 rounded-lg mx-2"
              >
                <FaHome className="w-5 h-5" />
                <span>Trang chủ</span>
              </Link>
              <Link
                to="/shop"
                onClick={toggleMenu}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 rounded-lg mx-2"
              >
                <FaStore className="w-5 h-5" />
                <span>Shop</span>
              </Link>
              {!user && (
                <Link
                  to="/auth/login"
                  onClick={toggleMenu}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-center mx-2 mt-4"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;