const mongoose = require("mongoose");

// STEP 2 - DEFINE THE SCHEMA

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  }
})

// STEP 3 - CREATE THE MODEL
module.exports = mongoose.model("Todo", todoSchema);