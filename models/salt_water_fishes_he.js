const mongoose = require("mongoose");

const SpecificationSchema = mongoose.Schema({});

const PostSchema = mongoose.Schema({
  lang: { type: String, require: false },
  id: { type: Number, requrie: true },
  name: { type: String, require: true },
  scientific_name: { type: String, require: false },
  family_name: { type: String, require: false },
  sub_family: { type: String, require: false },
  nick_name: { type: String, require: false },
  description: { type: String, require: false },
  main_img: { type: String, require: false },
  specification: mongoose.Schema.Types.Mixed,
  feeding: [],
  acclimatisation: { type: String, require: false },
});

module.exports = mongoose.model("salt_water_fishes_he", PostSchema);
