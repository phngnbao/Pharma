import axios from 'axios'
import { cloudinaryUpload } from './cloudinaryUpload'

// upload image and return image url
export const imageUpload = async imageData => {
  // Sử dụng Cloudinary thay vì ImgBB
  return await cloudinaryUpload(imageData)
}
