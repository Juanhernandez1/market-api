const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let securitySchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  owner_name: {
    type: String
  },
  number: {
    type: Number,
    default: true
  },
  due_date: {
    type: String,
    required: [true, "La fecha de vencimiento es requerida!"]
  },
  ccv: {
    type: Number,
    required: [true, "El ccv es requerido!"]
  },
  is_selected_to_pay: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Cards", securitySchema);
