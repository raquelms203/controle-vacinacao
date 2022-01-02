var mongoose = require("mongoose");

var personSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  cpf: {
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
  birth_date: {
    require: true,
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

var Person = (module.exports = mongoose.model("person", personSchema));

module.exports.get = function (callback, limit) {
  Person.find(callback).limit(limit);
};
