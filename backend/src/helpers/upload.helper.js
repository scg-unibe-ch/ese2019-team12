import 'dotenv/config';
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null, path.join(__dirname, process.env.IMAGE_DIR));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

export var upload = multer({ storage: storage });
