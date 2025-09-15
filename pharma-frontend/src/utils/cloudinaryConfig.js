import { Cloudinary } from '@cloudinary/url-gen';

// Khởi tạo cấu hình Cloudinary
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true // Sử dụng HTTPS
  }
});

export default cloudinary;