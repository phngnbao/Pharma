import React from 'react';
import {
    FaPills,
    FaIndustry,
    FaCalendarAlt,
    FaWeight,
    FaFlask,
    FaBoxes,
    FaThermometerHalf,
    FaShieldAlt
} from 'react-icons/fa';

const SpecificationSection = ({ medicine }) => {
    const specifications = [
        {
            icon: <FaPills className="text-blue-500" />,
            label: 'Tên chung',
            value: medicine.genericName
        },
        {
            icon: <FaIndustry className="text-green-500" />,
            label: 'Hãng',
            value: medicine.companyName
        },
        {
            icon: <FaWeight className="text-purple-500" />,
            label: 'Dạng',
            value: medicine.dosageForm
        },
        {
            icon: <FaBoxes className="text-orange-500" />,
            label: 'Danh mục',
            value: medicine.categoryName
        },
        {
            icon: <FaCalendarAlt className="text-red-500" />,
            label: 'Số lượng',
            value: `${medicine.stockQuantity}`
        },
        {
            icon: <FaFlask className="text-indigo-500" />,
            label: 'Giảm giá',
            value: `${medicine.discount}%`
        }
    ];

    const storageInstructions = [
        'Lưu trữ trong môi trường tươi mới, ấm áp',
        'Không nên lưu trữ ở nhiệt độ cao',
        'Lưu trữ ở nhiệt độ ambiente (15-25°C)',
        'Lưu trữ ở nơi có ánh sáng',
        'Không nên lạnh',
        'Lưu trữ trong container kín'
    ];

    const safetyInfo = [
        'Đọc kỹ tất cả các cảnh báo và hướng dẫn trước khi sử dụng',
        'Hãy hỏi lại bác sĩ trước khi sử dụng',
        'Không nên vượt quá số lượng được đề nghị',
        'Hãy ngừng sử dụng nếu có bất kỳ phản ứng nào xảy ra',
        'Có thể gây mệt mỏi - không nên sử dụng khi bị ảnh hưởng',
        'Hãy kiểm tra lại thuốc trước khi sử dụng'
    ];

    return (
        <div className="space-y-6">
            {/* Product Specifications */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Thông tin chung
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                            <div className="text-xl">
                                {spec.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {spec.label}
                                </p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {spec.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Storage Instructions */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaThermometerHalf className="text-blue-500" />
                    Hướng dẫn lưu trữ
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <ul className="space-y-2">
                        {storageInstructions.map((instruction, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-blue-800 dark:text-blue-200"
                            >
                                <span className="text-blue-500 mt-1">•</span>
                                <span className="text-sm">{instruction}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Safety Information */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaShieldAlt className="text-red-500" />
                    Thông tin an toàn
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="text-red-500 text-xl">⚠️</div>
                        <div>
                            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                                Hãy đọc kỹ
                            </h4>
                            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                                Thuốc này yêu cầu xử lý cẩn thận và sử dụng đúng cách.
                                Hãy đọc kỹ tất cả các hướng dẫn và hãy hỏi lại bác sĩ trước khi sử dụng.
                            </p>
                        </div>
                    </div>

                    <ul className="space-y-2">
                        {safetyInfo.map((info, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-red-800 dark:text-red-200"
                            >
                                <span className="text-red-500 mt-1">•</span>
                                <span className="text-sm">{info}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Hiệu quả
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                        <li>• Hiệu quả được xác nhận bởi FDA</li>
                        <li>• Hiệu quả được xác nhận bởi GMP</li>
                        <li>• Hiệu quả được xác nhận bởi bên thứ ba</li>
                        <li>• Hiệu quả được đảm bảo</li>
                    </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                        <span className="text-purple-500">📋</span>
                        Thông tin đơn thuốc
                    </h4>
                    <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                        <li>• Đơn thuốc có thể được yêu cầu</li>
                        <li>• Hãy hỏi lại bác sĩ</li>
                        <li>• Hãy theo dõi đúng cách</li>
                        <li>• Hãy theo dõi thường xuyên</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SpecificationSection;
