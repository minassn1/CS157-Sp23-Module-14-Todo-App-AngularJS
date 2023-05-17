const mongoose = require("mongoose");


// Schema for the user collection

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 15
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    index: { // Index only gets created automatically for a new collection
      unique: true,
      collation: { locale: "en", strength: 2 } // case in-senstive index
    },
    match: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },
  address: {
    number: { type: String },
    street: { type: String },
    city: { type: String },
    zip: { type: String }
  },
  phoneNumbers: [{
    location: { type: String, required: true, enum:["home", "work", "cell", "other"] },
    number: { type: String, required: true, match: /^[2-9]\d{2}-\d{3}-\d{4}$/gm }
  }],
  nickNames: {
    type: [String]
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model("User", userSchema);