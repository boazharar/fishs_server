/// for work between dimains
const cors = require("cors");
//// for upload files and create folders to azure
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const account = "fishtorage";
const accountKey =
  "?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-04-17T19:13:53Z&st=2021-04-17T11:13:53Z&spr=https,http&sig=R%2FRSxCfLAKzhUnr3%2BdoxKD8Om27YvW8jnNGM6aIoQVA%3D";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const express = require("express");
const app = express();
const port = 6000;
const bodyParser = require("body-parser");
const multer = require("multer");
//const inMemoryStorage = multer.memoryStorage();
//const singleFileUpload = multer({ storage: inMemoryStorage });
const azureStorage = require("azure-storage");
const getStream = require("into-stream");
const router = express.Router();
const fs = require("fs");
router.use(cors());

const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.post("/", async (req, res) => {
  const fileName = req.body.file_name;
  const folderName = req.body.folder_name;

  try {
    // if folder not exist create one

    if (!fs.existsSync("public/images/salt_water_fishes")) {
      console.log("create folder salt_water_fishes");
      fs.mkdirSync("public/images/salt_water_fishes");
    }
    const testFolder = `public/images/salt_water_fishes/${folderName}`;
    if (!fs.existsSync(testFolder)) {
      console.log(`create folder ${folderName}`);
      fs.mkdirSync(`public/images/salt_water_fishes/${folderName}`);
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
      mainImage.mv(
        `./public/images/salt_water_fishes/${folderName}/${fileName}`
      );
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
module.exports = router;
