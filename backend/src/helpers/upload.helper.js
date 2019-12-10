import 'dotenv/config'
import * as path from 'path'
import * as multer from 'multer'

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname)
    cb(null, path.join(__dirname, process.env.IMAGE_DIR))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

export var upload = multer.default({ storage: storage })
