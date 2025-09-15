// import React, { useState } from 'react';

// const HealthBlogNewsletter = () => {
//     const [email, setEmail] = useState('');
//     const [isSubscribed, setIsSubscribed] = useState(false);

//     const handleSubscribe = (e) => {
//         e.preventDefault();
//         if (email) {
//             // Here you would typically make an API call to subscribe the user
//             console.log('Subscribing email:', email);
//             setIsSubscribed(true);
//             setEmail('');
//             setTimeout(() => setIsSubscribed(false), 3000); // Reset after 3 seconds
//         }
//     };

//     return (
//         <div className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-700 dark:to-green-700 text-white py-16">
//             <div className="container mx-auto px-4 text-center">
//                 <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
//                     Stay Updated with Health Insights
//                 </h2>
//                 <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
//                     Subscribe to our newsletter for the latest health tips, medication guides, and expert advice
//                 </p>
//                 <form
//                     onSubmit={handleSubscribe}
//                     className="max-w-md mx-auto flex gap-4"
//                     data-aos="fade-up"
//                     data-aos-delay="400"
//                 >
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
//                     />
//                     <button
//                         type="submit"
//                         disabled={isSubscribed}
//                         className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-75"
//                     >
//                         {isSubscribed ? 'Subscribed!' : 'Subscribe'}
//                     </button>
//                 </form>
//                 {isSubscribed && (
//                     <p className="mt-4 text-sm opacity-90">
//                         Thank you for subscribing! You'll receive our latest health insights soon.
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default HealthBlogNewsletter;
import React, { useState } from 'react';

const HealthBlogNewsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // Thực hiện đăng ký (thường là gọi API)
            console.log('Đăng ký email:', email);
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000); // Đặt lại sau 3 giây
        }
    };

    return (
        <div className="bg-gray-800 text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Cập nhật thông tin sức khỏe
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                    Đăng ký nhận bản tin để nhận mẹo sức khỏe, hướng dẫn sử dụng thuốc và lời khuyên từ chuyên gia.
                </p>
                <form
                    onSubmit={handleSubscribe}
                    className="max-w-md mx-auto flex gap-4"
                >
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <button
                        type="submit"
                        disabled={isSubscribed}
                        className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-75"
                    >
                        {isSubscribed ? 'Đã đăng ký!' : 'Đăng ký'}
                    </button>
                </form>
                {isSubscribed && (
                    <p className="mt-4 text-sm opacity-90">
                        Cảm ơn bạn đã đăng ký! Bạn sẽ nhận được thông tin sức khỏe mới nhất sớm thôi.
                    </p>
                )}
            </div>
        </div>
    );
};

export default HealthBlogNewsletter;