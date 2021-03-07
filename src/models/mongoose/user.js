const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let userRoles = {
  values: ["user", "provider"],
  message: "{Value} is not a valid."
};

let userSchema = new Schema({
  avatar: {
    type: String,
    default: "https://market-api-jc.s3.us-east-2.amazonaws.com/users/default-picture.png"
  },
  email: {
    type: String,
    unique: true,
    validate: {
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
    type: String,
    default: null
  },
  nit: {
    type: String,
    default: null
  },
  phones: {
    type: String,
    default: null
  },
  coordinates: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: "user",
    validate: {
      validator: function (v) {
        return /user|provider/i.test(v);
      },
      message: props => `${props.value} is not a valid user role`
    },
    enum: userRoles
  },
  cost_of_shipping: {
    type: String,
    default: "0.00"
  },
  delivery_business_days: {
    type: Number,
    default: 2
  },
  code_to_verify_email: {
    type: String
  },
  send_at: {
    type: String
  },
  is_email_verified: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  is_oauth2: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(uniqueValidator, { message: "Error, expected {PATH} to be unique." });

module.exports = mongoose.model("User", userSchema);
