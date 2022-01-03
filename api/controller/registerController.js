Register = require("../model/registerModel");
Vaccine = require("../model/vaccineModel");
Person = require("../model/personModel");
Unity = require("../model/unityModel");
functions = require("../utils/functions");

exports.index = function (_, res) {
  Register.get(function (err, registers) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    else {
      registers.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      for (let i = 0; i < registers.length; i++) {
        Person.findById(registers[i].person_id, function (e_rPerson, person) {
          if (person) registers[i].person_name = person.name;
          Vaccine.findById(registers[i].vaccine_id, function (_, vaccine) {
            if (vaccine) {
              registers[i].vaccine_name = vaccine.name;
              if (registers[i].dose === 0) registers[i].dose_taken = `1 / 1`;
              else
                registers[
                  i
                ].dose_taken = `${registers[i].dose} / ${vaccine.dose}`;
            }
            Unity.findById(registers[i].unity_id, function (_, unity) {
              if (unity) registers[i].unity_name = unity.name;
              if (i === registers.length - 1)
                res.json({
                  status: "success",
                  message: "ok",
                  data: registers,
                });
            });
          });
        });
      }
    }
  });
};
exports.getDoses = function (_, res) {
  Register.get(function (err, registers) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    else {
      var quantities = {
        single_dose: 0,
        first_dose: 0,
        second_dose: 0,
        total: 0,
      };
      var vaccines = {};
      function calculateValues() {
        for (let i = 0; i < registers.length; i++) {
          let register = registers[i];
          Vaccine.findById(register.vaccine_id, function (err, vaccine) {
            if (err || vaccine === undefined) {
              res.send(err);
            }
            let id = vaccine._id.toString();
            switch (register.dose) {
              case 0:
                quantities = {
                  ...quantities,
                  single_dose: (quantities.single_dose += 1),
                  total: (quantities.total += 1),
                };
                break;
              case 1:
                quantities = {
                  ...quantities,
                  first_dose: (quantities.first_dose += 1),
                  total: (quantities.total += 1),
                };
                break;
              case 2:
                quantities = {
                  ...quantities,
                  second_dose: (quantities.second_dose += 1),
                  total: (quantities.total += 1),
                };
                break;
            }
            let quantity;
            if (vaccines[`${id}`] === undefined) quantity = 1;
            else quantity = vaccines[`${id}`].quantity += 1;
            vaccines = {
              ...vaccines,
              [`${id}`]: {
                name: vaccine.name,
                quantity: quantity,
                percentage:
                  registers.length !== 0 ? quantity / registers.length : 1,
              },
            };
            if (i === registers.length - 1)
              res.json({
                status: "success",
                message: "ok",
                data: {
                  quantities,
                  vaccines,
                  total_vaccines: registers.length,
                },
              });
          });
        }
      }
      calculateValues();
    }
  });
};

exports.new = function (req, res) {
  var register = new Register();

  register.date = req.body.date;
  register.person_id = req.body.person_id;
  register.unity_id = req.body.unity_id;
  register.dose = req.body.dose;
  register.vaccine_id = req.body.vaccine_id;
  register.created_at = functions.dateToUtc(new Date());
  register.update_at = functions.dateToUtc(new Date());

  register.save(function (err) {
    if (err) res.json(err);
    else
      res.json({
        message: "ok",
        data: register,
      });
  });
};

exports.view = function (req, res) {
  Register.findById(req.params.register_id, function (err, register) {
    if (err) res.send(err);
    else
      res.json({
        message: "1 register found",
        data: register,
      });
  });
};

exports.update = function (req, res) {
  Register.findById(req.params.register_id, function (err, register) {
    if (err) res.send(err);
    else {
      register.date = req.body.date ? req.body.date : register.date;
      register.person_id = req.body.person_id
        ? req.body.person_id
        : register.person_id;
      register.unity_id = req.body.unity_id
        ? req.body.unity_id
        : register.unity_id;
      register.vaccine_id = req.body.vaccine_id
        ? req.body.vaccine_id
        : register.vaccine_id;
      register.dose = req.body.dose ? req.body.dose : register.dose;
      register.update_at = functions.dateToUtc(new Date());

      register.save(function (err) {
        if (err) res.json(err);
        else res.json({ message: "ok", data: register });
      });
    }
  });
};

exports.delete = function (req, res) {
  Register.deleteOne(
    {
      _id: req.params.register_id,
    },
    function (err, _) {
      if (err) res.send(err);
      else res.json({ status: "ok", message: "register deleted" });
    }
  );
};
