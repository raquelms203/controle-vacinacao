let Router = require("express").Router();
var personController = require("../controller/personController");
var userController = require("../controller/userController");
var registerController = require("../controller/registerController");
var vaccineController = require("../controller/vaccineController");
var unityController = require("../controller/unityController");

Router.get("/", function (req, res) {
  res.json({
    status: "WORKING",
    message: "/api route",
  });
});

Router.route("/persons").get(personController.index).post(personController.new);

Router.route("/person/:person_id")
  .get(personController.view)
  .put(personController.update)
  .delete(personController.delete);

Router.route("/registers")
  .get(registerController.index)
  .post(registerController.new);

Router.route("/register/:register_id")
  .get(registerController.view)
  .put(registerController.update)
  .delete(registerController.delete);

Router.route("/doses").get(registerController.getDoses);

Router.route("/unities").get(unityController.index).post(unityController.new);

Router.route("/unity/:unity_id")
  .get(unityController.view)
  .put(unityController.update)
  .delete(unityController.delete);

Router.route("/vaccines")
  .get(vaccineController.index)
  .post(vaccineController.new);

Router.route("/vaccine/:vaccine_id")
  .get(vaccineController.view)
  .put(vaccineController.update)
  .delete(vaccineController.delete);

Router.route("/users").get(userController.index).post(userController.new);

Router.route("/user/:user_id")
  .get(userController.view)
  .put(userController.update)
  .delete(userController.delete);

Router.route("/login").post(userController.login);

module.exports = Router;
