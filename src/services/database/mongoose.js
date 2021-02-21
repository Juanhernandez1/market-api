const mongoose = require('mongoose');

function mongooseConnection(config) {
    mongoose.connect(config.database.uri_mongodb, config.database.options).then(
        (res) => { console.log("Connection successfully !"); },
        (err) =>  { console.log(err); }
    );
}

module.exports = mongooseConnection;
