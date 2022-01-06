Vaccine = require("../model/vaccineModel");
Register = require("../model/registerModel");
functions = require("../utils/functions");

exports.index = function (_, res) {
  Vaccine.get(function (err, vaccines) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    else {
      vaccines.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      res.json({
        status: "success",
        message: "ok",
        data: vaccines,
      });
    }
  });
};

exports.new = function (req, res) {
  var vaccine = new Vaccine();
  vaccine.name = req.body.name;
  vaccine.fabricator = req.body.fabricator;
  vaccine.country = req.body.country;
  vaccine.dose = req.body.dose;
  vaccine.created_at = functions.dateToUtc(new Date());
  vaccine.update_at = functions.dateToUtc(new Date());

  vaccine.save(function (err) {
    if (err) res.json(err);
    else
      res.json({
        message: "ok",
        data: vaccine,
      });
  });
};

exports.view = function (req, res) {
  Vaccine.findById(req.params.vaccine_id, function (err, vaccine) {
    if (err) res.send(err);
    else
      res.json({
        message: "1 vaccine found",
        data: vaccine,
      });
  });
};

exports.update = function (req, res) {
  Vaccine.findById(req.params.vaccine_id, function (err, vaccine) {
    if (err) res.send(err);
    else {
      vaccine.name = req.body.name ? req.body.name : vaccine.name;
      vaccine.fabricator = req.body.fabricator
        ? req.body.fabricator
        : vaccine.fabricator;
      vaccine.country = req.body.country ? req.body.country : vaccine.country;
      vaccine.dose = req.body.dose ? req.body.dose : vaccine.dose;
      vaccine.update_at = functions.dateToUtc(new Date());

      vaccine.save(function (err) {
        if (err) res.json(err);
        else res.json({ message: "ok", data: vaccine });
      });
    }
  });
};

exports.delete = function (req, res) {
  Register.find({ vaccine_id: req.params.vaccine_id }, function (_, register) {
    if (register) {
      res.statusCode = 400;
      res.json({
        status: "error",
        message: "can't delete because this vaccine is in use on registers.",
      });
    } else {
      Vaccine.deleteOne(
        {
          _id: req.params.vaccine_id,
        },
        function (err, _) {
          if (err) res.send(err);
          else res.json({ status: "ok", message: "vaccine deleted" });
        }
      );
    }
  });
};
