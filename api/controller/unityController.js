Unity = require("../model/unityModel");
functions = require("../utils/functions");

exports.index = function (_, res) {
  Unity.get(function (err, unities) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    else {
      unities.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      res.json({
        status: "success",
        message: "ok",
        data: unities,
      });
    }
  });
};

exports.new = function (req, res) {
  var unity = new Unity();
  unity.name = req.body.name;
  unity.district = req.body.district;
  unity.city = req.body.city;
  unity.state = req.body.state;
  unity.birth_date = req.body.birth_date;
  unity.created_at = functions.dateToUtc(new Date());
  unity.update_at = functions.dateToUtc(new Date());

  unity.save(function (err) {
    if (err) res.json(err);
    else
      res.json({
        message: "ok",
        data: unity,
      });
  });
};

exports.view = function (req, res) {
  Unity.findById(req.params.unity_id, function (err, unity) {
    if (err) res.send(err);
    else
      res.json({
        message: "1 unity found",
        data: unity,
      });
  });
};

exports.update = function (req, res) {
  Unity.findById(req.params.unity_id, function (err, unity) {
    if (err) res.send(err);
    else {
      unity.name = req.body.name ? req.body.name : unity.name;
      unity.birth_date = req.body.birth_date
        ? req.body.birth_date
        : unity.birth_date;
      unity.district = req.body.district ? req.body.district : unity.district;
      unity.city = req.body.city ? req.body.city : unity.city;
      unity.state = req.body.state ? req.body.state : unity.state;
      unity.update_at = functions.dateToUtc(new Date());

      unity.save(function (err) {
        if (err) res.json(err);
        else res.json({ message: "ok", data: unity });
      });
    }
  });
};

exports.delete = function (req, res) {
  Unity.deleteOne(
    {
      _id: req.params.unity_id,
    },
    function (err, _) {
      if (err) res.send(err);
      else res.json({ status: "ok", message: "unity deleted" });
    }
  );
};
