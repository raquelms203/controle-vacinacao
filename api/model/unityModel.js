var mongoose = require("mongoose");

var unitySchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  district: {
    require: true,
    type: String,
  },
  city: {
    require: true,
    type: String,
  },
  state: {
    require: true,
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

var Unity = (module.exports = mongoose.model("unity", unitySchema));

module.exports.get = function (callback, limit) {
  Unity.find(callback).limit(limit);
};
