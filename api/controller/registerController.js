Register = require("../model/registerController");
functions = require("../utils/functions");

exports.index = function (_, res) {
  Register.get(function (err, registers) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    else
      res.json({
        status: "success",
        message: "ok",
        data: registers,
      });
  });
};

exports.new = function (req, res) {
  var register = new Register();

  register.date = req.body.date;
  register.person_id = req.body.person_id;
  register.unity_id = req.body.unity_id;
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
