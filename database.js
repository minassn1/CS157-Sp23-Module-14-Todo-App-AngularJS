const mongoose = require("mongoose");

// STEP 1 - ESTABLISH THE CONNECTION

mongoose.connect(
  // Connection String
  process.env.DATABASE,
  // Options we can pass to Mongoose
  { }
  // Callback result of our connection attempt
)