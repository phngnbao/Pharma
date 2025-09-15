import axios from 'axios';

// Upload image to Cloudinary and return image URL
export const cloudinaryUpload = async (imageData) => {
  const imageFormData = new FormData();
  imageFormData.append('file', imageData);
  imageFormData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  imageFormData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      imageFormData
    );
    
    // Return secure URL from Cloudinary response
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};