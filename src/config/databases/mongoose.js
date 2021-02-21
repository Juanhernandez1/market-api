require('dotenv').config();
const uri_mongodb = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10,
    socketTimeoutMS: 45000,
    useFindAndModify: false
};

module.exports = {
    uri_mongodb,
    options
}