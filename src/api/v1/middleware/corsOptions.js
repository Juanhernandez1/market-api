const domainsAllowed = require('../../../config/cors/domainAllowed');

let corsOptions = {
    origin: function (origin, callback) {
        if (domainsAllowed.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = {
    corsOptions
}