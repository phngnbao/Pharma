// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import OrderSummary from './components/OrderSummary/OrderSummary';
// import PaymentSection from './components/PaymentSection/PaymentSection';
// import { useTitle, PAGE_TITLES } from '../../hooks/useTitle';

// // loadStripe initializes Stripe with your publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// // Mock cart data - In real app, this would come from context/localStorage/API
// // const mockCartItems = [
// //     {
// //         id: 1,
// //         name: 'Paracetamol',
// //         genericName: 'Acetaminophen',
// //         company: 'Square Pharmaceuticals',
// //         category: 'tablet',
// //         massUnit: '500mg',
// //         pricePerUnit: 2.50,
// //         discount: 10,
// //         quantity: 2,
// //         stockQuantity: 500,
// //         image: 'https://via.placeholder.com/300x200?text=Paracetamol'
// //     },
// //     {
// //         id: 2,
// //         name: 'Amoxicillin Syrup',
// //         genericName: 'Amoxicillin',
// //         company: 'Beximco Pharmaceuticals',
// //         category: 'syrup',
// //         massUnit: '250mg/5ml',
// //         pricePerUnit: 15.75,
// //         discount: 5,
// //         quantity: 1,
// //         stockQuantity: 120,
// //         image: 'https://via.placeholder.com/300x200?text=Amoxicillin'
// //     },
// //     {
// //         id: 3,
// //         name: 'Vitamin D3 Capsules',
// //         genericName: 'Cholecalciferol',
// //         company: 'Incepta Pharmaceuticals',
// //         category: 'capsule',
// //         massUnit: '1000 IU',
// //         pricePerUnit: 8.50,
// //         discount: 0,
// //         quantity: 3,
// //         stockQuantity: 200,
// //         image: 'https://via.placeholder.com/300x200?text=Vitamin+D3'
// //     }
// // ];

// const Checkout = () => {
//     useTitle(PAGE_TITLES.CHECKOUT);
//     const [cartItems, setCartItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentStep, setCurrentStep] = useState(1);
//     const [customerInfo, setCustomerInfo] = useState(null);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm();

//     useEffect(() => {
//         // In real app, check if cart is empty and redirect to cart page
//         const savedCart = localStorage.getItem('cartItems');
//         if (savedCart) {
//             setCartItems(JSON.parse(savedCart));
//         }
//         setLoading(false);
//     }, []);

//     // Calculate discounted price
//     const getDiscountedPrice = (price, discount) => {
//         return discount > 0 ? price - (price * discount / 100) : price;
//     };

//     // Calculate order total
//     const calculateOrderTotal = () => {
//         const subtotal = cartItems.reduce((total, item) => {
//             const itemPrice = getDiscountedPrice(item.pricePerUnit, item.discount || 0);
//             return total + (itemPrice * item.quantity);
//         }, 0);

//         const taxRate = 0.08;
//         const tax = subtotal * taxRate;
//         const shippingCost = subtotal >= 50 ? 0 : 5.99;

//         return subtotal + tax + shippingCost;
//     };

//     // Handle customer information submission
//     const onSubmitCustomerInfo = (data) => {
//         setCustomerInfo(data);
//         setCurrentStep(2);
//         toast.success('Information saved. Proceed to payment.');
//     };

//     // Handle payment success
//     const handlePaymentSuccess = () => {
//         // Clear cart after successful payment
//         localStorage.removeItem('cartItems');
//         toast.success('Order placed successfully!');
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//             </div>
//         );
//     }

//     if (cartItems.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
//                 <div className="max-w-md mx-auto text-center">
//                     <FaShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                         Your cart is empty
//                     </h2>
//                     <p className="text-gray-600 dark:text-gray-400 mb-8">
//                         Add some medicines to your cart before proceeding to checkout.
//                     </p>
//                     <Link
//                         to="/shop"
//                         className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//                     >
//                         Continue Shopping
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <Link
//                         to="/cart"
//                         className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
//                     >
//                         <FaArrowLeft className="mr-2" />
//                         Back to Cart
//                     </Link>
//                     <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//                         Checkout
//                     </h1>
//                     <p className="text-gray-600 dark:text-gray-400">
//                         Complete your purchase securely
//                     </p>
//                 </div>

//                 {/* Progress Steps */}
//                 <div className="mb-8">
//                     <div className="flex items-center justify-center">
//                         <div className="flex items-center space-x-4">
//                             <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
//                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
//                                     1
//                                 </div>
//                                 <span className="ml-2 text-sm font-medium">Customer Info</span>
//                             </div>
//                             <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
//                             <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
//                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
//                                     2
//                                 </div>
//                                 <span className="ml-2 text-sm font-medium">Payment</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2">
//                         {currentStep === 1 ? (
//                             /* Customer Information Form */
//                             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
//                                     <FaUser className="mr-2" />
//                                     Customer Information
//                                 </h2>

//                                 <form onSubmit={handleSubmit(onSubmitCustomerInfo)} className="space-y-6">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                                 Full Name *
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 {...register('fullName', { required: 'Full name is required' })}
//                                                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                                                 placeholder="Enter your full name"
//                                             />
//                                             {errors.fullName && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
//                                             )}
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                                 Email Address *
//                                             </label>
//                                             <input
//                                                 type="email"
//                                                 {...register('email', {
//                                                     required: 'Email is required',
//                                                     pattern: {
//                                                         value: /^\S+@\S+$/i,
//                                                         message: 'Invalid email address'
//                                                     }
//                                                 })}
//                                                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                                                 placeholder="Enter your email"
//                                             />
//                                             {errors.email && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                                             )}
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                                 Phone Number *
//                                             </label>
//                                             <input
//                                                 type="tel"
//                                                 {...register('phone', { required: 'Phone number is required' })}
//                                                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                                                 placeholder="Enter your phone number"
//                                             />
//                                             {errors.phone && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
//                                             )}
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                                 Date of Birth
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 {...register('dateOfBirth')}
//                                                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
//                                             <FaMapMarkerAlt className="mr-2" />
//                                             Shipping Address
//                                         </h3>

//                                         <div className="space-y-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                                     Street Address *
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     {...register('address', { required: 'Address is required' })}
//                                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                                                     placeholder="Enter your street address"
//                                                 />
//                                                 {errors.address && (
//                                                     <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
//                                                 )}
//                                             </div>

//                                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                                         City *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         {...register('city', { required: 'City is required' })}
//                                                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                                                         placeholder="City"
//                                                     />
//                                                     {errors.city && (
//                                                         <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
//                                                     )}
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                                         State *
//                                                     </label>
//                                                     <select
//                                                         {...register('state', { required: 'State is required' })}
//                                                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                                                     >
//                                                         <option value="">Select State</option>
//                                                         <option value="AL">Alabama</option>
//                                                         <option value="CA">California</option>
//                                                         <option value="NY">New York</option>
//                                                         <option value="TX">Texas</option>
//                                                         <option value="FL">Florida</option>
//                                                         {/* Add more states as needed */}
//                                                     </select>
//                                                     {errors.state && (
//                                                         <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
//                                                     )}
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                                         ZIP Code *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         {...register('zipCode', { required: 'ZIP code is required' })}
//                                                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                                                         placeholder="ZIP Code"
//                                                     />
//                                                     {errors.zipCode && (
//                                                         <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <button
//                                         type="submit"
//                                         className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
//                                     >
//                                         Continue to Payment
//                                     </button>
//                                 </form>
//                             </div>
//                         ) : (
//                             /* Payment Section */
//                             <Elements stripe={stripePromise}>
//                                 <PaymentSection
//                                     customerInfo={customerInfo}
//                                     orderTotal={calculateOrderTotal()}
//                                     cartItems={cartItems}
//                                     onPaymentSuccess={handlePaymentSuccess}
//                                 />
//                             </Elements>
//                         )}

//                         {/* Step 2 - Edit Customer Info Button */}
//                         {currentStep === 2 && (
//                             <div className="mt-6">
//                                 <button
//                                     onClick={() => setCurrentStep(1)}
//                                     className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
//                                 >
//                                     ← Edit Customer Information
//                                 </button>
//                             </div>
//                         )}
//                     </div>

//                     {/* Order Summary Sidebar */}
//                     <div className="lg:col-span-1">
//                         <OrderSummary
//                             cartItems={cartItems}
//                             getDiscountedPrice={getDiscountedPrice}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import OrderSummary from './components/OrderSummary/OrderSummary';
import PaymentSelection from './components/PaymentSection/PaymentSection';
import { useTitle, PAGE_TITLES } from '../../hooks/useTitle';

const Checkout = () => {
  useTitle(PAGE_TITLES.CHECKOUT);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  // Calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  // Calculate order total
  const calculateOrderTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const itemPrice = getDiscountedPrice(item.pricePerUnit, item.discount || 0);
      return total + itemPrice * item.quantity;
    }, 0);

    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const shippingCost = subtotal >= 50 ? 0 : 5.99;

    return subtotal + tax + shippingCost;
  };

  // Handle customer information submission
  const onSubmitCustomerInfo = (data) => {
    setCustomerInfo(data);
    setCurrentStep(2);
    toast.success('Thông tin đã được lưu. Tiếp tục thanh toán.');
  };

  // Handle payment success
  const handlePaymentSuccess = () => {
    localStorage.removeItem('cartItems');
    toast.success('Đơn hàng đã được đặt thành công!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-md mx-auto text-center">
          <FaShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Giỏ hàng của bạn đang trống
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thêm một số thuốc vào giỏ hàng trước khi tiếp tục thanh toán.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Quay lại giỏ hàng
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Thanh toán
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Hãy hoàn tất đơn hàng của bạn an toàn
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center ${
                  currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Thông tin khách hàng</span>
              </div>
              <div
                className={`w-16 h-1 ${
                  currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 2
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Thanh toán</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 ? (
              /* Customer Information Form */
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaUser className="mr-2" />
                  Thông tin khách hàng
                </h2>

                <form
                  onSubmit={handleSubmit(onSubmitCustomerInfo)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        {...register('fullName', {
                          required: 'Họ và tên là bắt buộc'
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Hãy nhập họ và tên"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email là bắt buộc',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Email không hợp lệ'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Hãy nhập email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        {...register('phone', {
                          required: 'Số điện thoại là bắt buộc'
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Hãy nhập số điện thoại"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        {...register('dateOfBirth')}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      Địa chỉ giao hàng
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          {...register('address', {
                            required: 'Address is required'
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter your street address"
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            {...register('city', { required: 'City is required' })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="City"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Quận/Huyện *
                          </label>
                          <input
                            type="text"
                            {...register('state', { required: 'Quận/Huyện là bắt buộc' })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Quận/Huyện"
                          />
                          {errors.state && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.state.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mã bưu điện *
                          </label>
                          <input
                            type="text"
                            {...register('zipCode', {
                              required: 'Mã bưu điện là bắt buộc'
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Mã bưu điện"
                          />
                          {errors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.zipCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Tiếp tục thanh toán
                  </button>
                </form>
              </div>
            ) : (
              /* Payment Section */
              <PaymentSelection
                customerInfo={customerInfo}
                orderTotal={calculateOrderTotal()}
                cartItems={cartItems}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}

            {/* Step 2 - Edit Customer Info Button */}
            {currentStep === 2 && (
              <div className="mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                >
                  ← Sửa thông tin khách hàng
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              getDiscountedPrice={getDiscountedPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;