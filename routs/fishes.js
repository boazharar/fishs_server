/// for work between dimains
const cors = require("cors");
//// for upload files and create folders to azure
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const account = "fishtorage";
const accountKey =
  "zOlKHwuUwhgObYn7ISY87JNTj1HLf9xQAuavl5nKTC9z+apQ8C5v1/LMVRjAlvwSxR8cc4KkboGzLbMsI2+VSQ==";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
/* const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
); */

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
router.use(cors());
const Post = require("../models/Post");
const SaltWaterFishes = require("../models/salt_water_fishes");
const SaltWaterFishesHe = require("../models/salt_water_fishes_he");

//for creating folder
const fs = require("fs");

//upload file
const fileUpload = require("express-fileupload");
const { send } = require("process");
router.use(fileUpload());

///////////////// new

router.use(
  express.urlencoded({
    extended: true,
  })
);

router.use(express.json());

var bodyParser = require("body-parser");
var app = express();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());
///////////////// new

/// get all results
router.get("/", async (req, res) => {
  console.log(`connection status : ${status[mongoose.connection.readyState]}`);
  console.log("testtttt");
  const postResult = await SaltWaterFishes.find();
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.send(postResult);
});

/// get all results in heb
router.get("/he", async (req, res) => {
  console.log(`connection status : ${status[mongoose.connection.readyState]}`);
  const postResult = await SaltWaterFishesHe.find();
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.send(postResult);
});

router.get("/:id", async (req, res) => {
  console.log(`connection status : ${status[mongoose.connection.readyState]}`);
  const postResult = await SaltWaterFishes.findById(req.params.id);
  res.send(postResult);
});

router.post("/remove/he", async (req, res) => {
  console.log(`delete from saltWaterFishesHe ${req.body.id}`);
  mongoose.set("useFindAndModify", false);

  SaltWaterFishesHe.findOneAndRemove({ _id: req.body.id }, (e, deletedRec) => {
    if (!e) {
      res.send(deletedRec);
    } else {
      res.send(e);
    }
  });
});
router.post("/remove/en", async (req, res) => {
  mongoose.set("useFindAndModify", false);
  console.log(`delete from saltWaterFishesEn ${JSON.stringify(req.body.id)}`);

  SaltWaterFishes.findOneAndRemove(
    { _id: req.body.idToRemove },
    (e, deletedRec) => {
      if (!e) {
        res.send(deletedRec);
      } else {
        res.send(e);
      }
    }
  );
});

//////////// submit post
router.post("/", async (req, res) => {
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyyy");
  console.log(req.body.lang);
  let post;
  switch (req.body.lang) {
    case "he":
      post = new SaltWaterFishesHe({
        id: req.body.id,
        name: req.body.name,
        scientific_name: req.body.scientific_name,
        family_name: req.body.family_name,
        sub_family: req.body.sub_family,
        nick_name: req.body.nick_name,
        description: req.body.description,
        main_img: req.body.main_img,
        specification: req.body.specification,
        feeding: req.body.feeding,
        acclimatisation: req.body.acclimatisation,
      });
      console.log(req.body.acclimatisation);
      break;

    case "en":
      post = new SaltWaterFishes({
        id: req.body.id,
        name: req.body.name,
        scientific_name: req.body.scientific_name,
        family_name: req.body.family_name,
        sub_family: req.body.sub_family,
        nick_name: req.body.nick_name,
        description: req.body.description,
        main_img: req.body.main_img,
        specification: req.body.specification,
        feeding: req.body.feeding,
        acclimatisation: req.body.acclimatisation,
      });
      break;
    default:
  }

  console.log(`connection status : ${status[mongoose.connection.readyState]}`);

  try {
    const results = await post.save();
    res.send(results);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
