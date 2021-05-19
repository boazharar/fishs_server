//const http = require("http");
//const https = require("https");

var express = require("express");
// Import the library:
var cors = require("cors");

var app = express();

// Then use it before your routes are set up:
app.use(cors());

//const router = express.Router();
const Post = require("./models/Post");

// make images floder public
app.use(express.static("public"));

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//////// for json request
app.use(express.json());
/////// for x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//app.use(express.urlencoded());
/// for secure connection string
require("dotenv/config");

global.status = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

//// connect to db -> must be first !!!
//"mongodb+srv://boze123:1qaz2wsx@cluster0.rf5pp.mongodb.net/fishes?retryWrites=true&w=majority",
mongoose.connect(
  //// this is the db url with user and password encrypted by env
  process.env.DB_CONNECTION,

  { useUnifiedTopology: true },
  () => {
    // console.log(      `connection status : ${status[mongoose.connection.readyState]}`    );
    console.log("v1 add to git");
  }
);

/// routs

/// import routs

const fishesRout = require("./routs/fishes");
const uploadFileRout = require("./routs/upload_file_azure");
const coralsRout = require("./routs/corals");
const loginRout = require("./routs/login");

//const removeItem = require("./routs/remove_item.js.txt");

app.use("/uploadfile", uploadFileRout);
app.use("/fishes", fishesRout);
app.use("/corals", coralsRout);
app.use("/fishes/login", loginRout);

//app.use("/remove", removeItem);

//// on enter main page
app.get("/", (req, res) => {
  res.send("we here at home !!!! v5");
});

/// on entering posts url

app.get("/posts", (req, res) => {
  res.send("we on posts page !!!! ");
});

//// start listening to server
///http.createServer(app).listen(8080);
//https.createServer(app).listen(8443);

//app.listen(4000);
app.listen(process.env.PORT || 5000);
//app.listen(port_number);
