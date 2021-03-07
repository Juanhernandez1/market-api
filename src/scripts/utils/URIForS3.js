require("dotenv").config();

module.exports = {
  URI_USERS: process.env.AWS_BUCKET_URI_FOR_USERS,
  URI_PRODUCTS: process.env.AWS_BUCKET_URI_FOR_PRODUCTS,
  USERS_FOLDER: process.env.AWS_USERS_FOLDER,
  PRODUCTS_FOLDER: process.env.AWS_PRODUCTS_FOLDER,
  ACL: process.env.AWS_ACL
};
