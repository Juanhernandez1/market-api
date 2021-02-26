require('dotenv').config();
const uri_mongodb = process.env.MONGO_DB_URI;
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