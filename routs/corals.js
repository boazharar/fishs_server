const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
router.use(cors());
const Post = require("../models/Post");
const Corals = require("../models/corals");
const CoralsHe = require("../models/corals_he");

//for creating folder
const fs = require("fs");

//upload file
const fileUpload = require("express-fileupload");
router.use(fileUpload());

/// get all results
router.get("/", async (req, res) => {
  console.log(`connection status : ${status[mongoose.connection.readyState]}`);
  const postResult = await Corals.find();
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
  const postResult = await CoralsHe.find();
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.send(postResult);
});

router.get("/:id", async (req, res) => {
  console.log(`connection status : ${status[mongoose.connection.readyState]}`);
  const postResult = await Corals.findById(req.params.id);
  res.send(postResult);
});

router.delete("/:id", async (req, res) => {
  try {
    const removePostResult = await Corals.remove({
      _id: req.params.id,
    });
    res.send(removePostResult);
  } catch (e) {
    console.log(e);
  }
});

//////////////// upload file

router.post("/uploadfile", async (req, res) => {
  const fileName = req.body.file_name;
  const folderName = req.body.folder_name;

  try {
    // if folder not exist create one
    if (!fs.existsSync("public/images/corals")) {
      fs.mkdirSync("public/images/corals");
    }
    const testFolder = `public/images/corals/${folderName}`;
    if (!fs.existsSync(testFolder)) {
      console.log(
        `tttttttttttttttttttt---- public/images/corals/${folderName}`
      );
      fs.mkdirSync(`public/images/corals/${folderName}`);
    }
  } catch (e) {
    console.log(e);
  }
  try {
    // if there is no files

    if (!req.files) {
      res.send("no files");
    } else {
      /// save file on main image
      let mainImage = req.files.mainimage;
      // move file to folder name loaction with is current name
      mainImage.mv(`./public/images/corals/${folderName}/${fileName}`);
      // send back status

      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: mainImage.name,
          mimetype: mainImage.mimetype,
          size: mainImage.size,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
});

//////////// submit post
router.post("/", async (req, res) => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  console.log(req.body.lang);
  let post;
  switch (req.body.lang) {
    case "he":
      post = new CoralsHe({
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

    case "en":
      post = new Corals({
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
