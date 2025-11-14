const cloudinary = require('cloudinary').v2;

const connectCloudinary  = async () => {
   
  cloudinary.config({
    cloud_name : process.env.CLOUDINARY__NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY__SECRET_KEY
  })
}

module.exports = connectCloudinary;