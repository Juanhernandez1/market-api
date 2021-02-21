const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let userRoles = {
    values: ['user','provider'],
    message: '{Value} is not a valid.'
};

let userSchema = new Schema({
    avatar: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
        validate:{
            validator: function (v) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, "Email is required !"]
    },
    name: {
        type: String,
        required: [true, "Name is required "]
    },
    password: {
        type: String,
        required: [true, "Password is required !"]
    },
    address: {
        type: String
    },
    nit:  {
        type: String,
        unique: true,
    },
    phones: {
        type: String,
    },
    coordinates: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
        validate:{
            validator: function (v) {
                return /user|provider/i.test(v);
            },
            message: props => `${props.value} is not a valid user role`
        },
        enum: userRoles
    },
    code_to_verify_email: {
        type: String
    },
    send_at :{
        type: String
    },
    email_verified:{
        type: Boolean,
        default: false,
    },
    status:{
        type: Boolean,
        default: true
    },
    oauth2:{
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator,{message: 'Error, expected {PATH} to be unique.'});

module.exports = mongoose.model('User',userSchema);