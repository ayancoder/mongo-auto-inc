const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

UserSchema = mongoose.Schema({
  name: String,
  country: String,
  city: String,
  seq_no: Number,
});

UserSchema.plugin(AutoIncrement, {
  id: "user_seq",
  inc_field: "seq_no",
  reference_fields: ["country", "city"],
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

