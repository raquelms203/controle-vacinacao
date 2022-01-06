Person = require("../model/personModel");
Register = require("../model/registerModel");
functions = require("../utils/functions");

exports.index = function (_, res) {
  Person.get(function (err, persons) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    else {
      persons.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      res.json({
        status: "success",
        message: "ok",
        data: persons,
      });
    }
  });
};

exports.new = function (req, res) {
  var person = new Person();
  person.name = req.body.name;
  person.birth_date = req.body.birth_date;
  person.cpf = req.body.cpf;
  person.city = req.body.city;
  person.state = req.body.state;
  person.district = req.body.district;
  person.created_at = functions.dateToUtc(new Date());
  person.update_at = functions.dateToUtc(new Date());

  person.save(function (err) {
    if (err) res.json(err);
    else
      res.json({
        message: "ok",
        data: person,
      });
  });
};

exports.view = function (req, res) {
  Person.findById(req.params.person_id, function (err, person) {
    if (err) res.send(err);
    else
      res.json({
        message: "1 person found",
        data: person,
      });
  });
};

exports.update = function (req, res) {
  Person.findById(req.params.person_id, function (err, person) {
    if (err) res.send(err);
    else {
      person.name = req.body.name ? req.body.name : person.name;
      person.birth_date = req.body.birth_date
        ? req.body.birth_date
        : person.birth_date;
      person.cpf = req.body.cpf ? req.body.cpf : person.cpf;
      person.update_at = functions.dateToUtc(new Date());

      person.save(function (err) {
        if (err) res.json(err);
        else res.json({ message: "ok", data: person });
      });
    }
  });
};

exports.delete = function (req, res) {
  Register.find({ vaccine_id: req.params.person_id }, function (_, register) {
    if (register) {
      res.statusCode = 400;
      res.json({
        status: "error",
        message: "can't delete because this person is in use on registers.",
      });
    } else {
      Person.deleteOne(
        {
          _id: req.params.person_id,
        },
        function (err, _) {
          if (err) res.send(err);
          else res.json({ status: "ok", message: "person deleted" });
        }
      );
    }
  });
};
