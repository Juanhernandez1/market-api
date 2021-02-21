const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let securitySchema = new Schema({
    user_id: {
        type: String
    },
    token: {
        type: String,
    },
    is_valid: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('Security',securitySchema);