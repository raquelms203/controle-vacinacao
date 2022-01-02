User = require("../model/userModel");
functions = require("../utils/functions");

exports.index = function (_, res) {
  User.get(function (err, users) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    else
      res.json({
        status: "success",
        message: "ok",
        data: users,
      });
  });
};

exports.new = function (req, res) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.created_at = functions.dateToUtc(new Date());
  user.update_at = functions.dateToUtc(new Date());

  user.save(function (err) {
    if (err) res.json(err);
    else
      res.json({
        message: "ok",
        data: user,
      });
  });
};

exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    else
      res.json({
        message: "1 user found",
        data: user,
      });
  });
};

exports.login = function (req, res) {
  User.find({ email: req.body.email }, function (err, user) {
    if (!req.body.email || !req.body.password || err) {
      res.status(400);
      res.json(err);
    } else if (!user[0] || user[0].password !== req.body.password) {
      res.status(400);
      res.json(err);
    } else
      res.json({
        message: "1 user found",
        data: user[0],
      });
  });
};

exports.update = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    else {
      user.name = req.body.name ? req.body.name : user.name;
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;
      user.update_at = functions.dateToUtc(new Date());

      user.save(function (err) {
        if (err) res.json(err);
        else res.json({ message: "ok", data: user });
      });
    }
  });
};

exports.delete = function (req, res) {
  User.deleteOne(
    {
      _id: req.params.user_id,
    },
    function (err, _) {
      if (err) res.send(err);
      else res.json({ status: "ok", message: "user deleted" });
    }
  );
};
