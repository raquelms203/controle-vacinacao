var mongoose = require("mongoose");

var vaccineSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  fabricator: {
    require: true,
    type: String,
  },
  country: {
    require: true,
    type: String,
  },
  dose: {
    require: true,
    type: Number,
  },
  update_at: {
    require: false,
    type: Date,
  },
  created_at: {
    require: false,
    type: Date,
  },
});

var Vaccine = (module.exports = mongoose.model("vaccine", vaccineSchema));

module.exports.get = function (callback, limit) {
  Vaccine.find(callback).limit(limit);
};
