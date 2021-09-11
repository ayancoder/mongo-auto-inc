const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

UserSchema = mongoose.Schema({
  name: String,
  country: String,
  city: String,
  inhabitant_number: Number,
});

UserSchema.plugin(AutoIncrement, {
  id: "inhabitant_seq",
  inc_field: "inhabitant_number",
  reference_fields: ["country", "city"],
});
module.exports = User = mongoose.model("user", UserSchema);
