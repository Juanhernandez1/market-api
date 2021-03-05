require('dotenv').config();

module.exports  ={
    URI_USERS: process.env.AWS_BUCKET_URI_FOR_USERS,
    URI_PRODUCTS: process.env.AWS_BUCKET_URI_FOR_PRODUCTS,
}