let mongoose = require("mongoose");
let schema = mongoose.Schema({
  username: "String",
  email: "String",
  password: "String",
});
module.exports = mongoose.model("chatappl", schema);
