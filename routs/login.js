const mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");

// Import the library:
var cors = require("cors");

var router = express();

// Then use it before your routes are set up:
router.use(cors());
//const settingsModel = require("../models/settings_module");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

var userSchema = new mongoose.Schema({
  userName: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

/* router.post("/", async (req, res) => {
  //    if (req.body.user ==
}); */

router.post("/", async (req, res) => {
  console.log("dddd");
  console.log(`connection status : ${status[mongoose.connection.readyState]}`);
  const results = await User.find();
  console.log(`${req.body.userReceived} ---- ${results[0].userName}`);
  console.log(results[0]);
  if (
    req.body.userReceived == results[0].userName &&
    req.body.passwordReceived == results[0].password
  ) {
    //results[0].valid = true;
    res.send({ valid: true });
  } else {
    res.send({ valid: false });
  }
});

module.exports = router;
