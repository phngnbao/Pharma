import React, { useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import cloudinary from '../../../utils/cloudinaryConfig';

/**
 * Component hiển thị hình ảnh từ Cloudinary với các tối ưu hóa
 * 
 * @param {Object} props - Props của component
 * @param {string} props.publicId - Public ID của hình ảnh trên Cloudinary (nếu sử dụng trực tiếp publicId)
 * @param {string} props.src - URL đầy đủ của hình ảnh (nếu sử dụng URL)
 * @param {string} props.alt - Alt text cho hình ảnh
 * @param {number} props.width - Chiều rộng mong muốn
 * @param {number} props.height - Chiều cao mong muốn
 * @param {string} props.className - Class CSS bổ sung
 * @param {string} props.fallback - URL hình ảnh fallback khi hình ảnh chính không tải được
 */
const CloudinaryImage = ({ publicId, src, alt, width, height, className, fallback, ...rest }) => {
  const [imgError, setImgError] = useState(false);
  // Nếu có URL đầy đủ, trích xuất publicId từ URL
  const extractedPublicId = src ? extractPublicIdFromUrl(src) : publicId;
  
  // Nếu có lỗi và có fallback, sử dụng fallback image
  if (imgError && fallback) {
    return <img src={fallback} alt={alt} className={className} {...rest} />;
  }

  // Nếu không có publicId hoặc không thể trích xuất, sử dụng img tag thông thường
  if (!extractedPublicId) {
    return <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={(e) => {
        if (fallback) {
          setImgError(true);
        }
      }}
      {...rest} 
    />;
  }

  // Cấu hình hình ảnh với Cloudinary
  const myImage = cloudinary.image(extractedPublicId);
  
  // Thiết lập kích thước nếu được cung cấp
  if (width && height) {
    myImage.resize(fill().width(width).height(height));
  }

  return (
    <AdvancedImage 
      cldImg={myImage} 
      alt={alt} 
      className={className} 
      onError={(e) => {
        if (fallback) {
          setImgError(true);
        }
      }}
      {...rest} 
    />
  );
};

/**
 * Trích xuất publicId từ URL Cloudinary
 * 
 * @param {string} url - URL của hình ảnh Cloudinary
 * @returns {string|null} - PublicId hoặc null nếu không thể trích xuất
 */
const extractPublicIdFromUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  // Kiểm tra xem URL có phải từ Cloudinary không
  if (!url.includes('cloudinary.com')) return null;
  
  try {
    // Mẫu URL Cloudinary: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/image.jpg
    const urlParts = url.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    
    if (uploadIndex === -1 || uploadIndex + 2 >= urlParts.length) return null;
    
    // Bỏ qua phần version (v1234567890) nếu có
    const startIndex = urlParts[uploadIndex + 1].startsWith('v') ? uploadIndex + 2 : uploadIndex + 1;
    
    // Ghép các phần còn lại để tạo publicId
    return urlParts.slice(startIndex).join('/');
  } catch (error) {
    console.error('Error extracting publicId from URL:', error);
    return null;
  }
};

export default CloudinaryImage;