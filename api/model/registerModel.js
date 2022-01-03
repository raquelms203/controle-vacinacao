var mongoose = require("mongoose");

var registerSchema = mongoose.Schema({
  person_id: {
    require: true,
    type: String,
  },
  unity_id: {
    require: true,
    type: String,
  },
  vaccine_id: {
    require: true,
    type: String,
  },
  person_name: {
    require: false,
    type: String,
  },
  unity_name: {
    require: false,
    type: String,
  },
  vaccine_name: {
    require: false,
    type: String,
  },
  dose: {
    require: true,
    type: Number,
  },
  dose_taken: {
    require: false,
    type: String,
  },
  date: {
    require: false,
    type: Date,
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

var Register = (module.exports = mongoose.model("register", registerSchema));

module.exports.get = function (callback, limit) {
  Register.find(callback).limit(limit);
};
