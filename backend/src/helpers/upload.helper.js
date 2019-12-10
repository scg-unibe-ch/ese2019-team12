import 'dotenv/config'
import * as path from 'path'
import * as multer from 'multer'

/**
 * Upload helper functions
 *
 * @module helper/upload
 * @requires path
 * @requires multer
 * @requires 'dotenv/config'
 */

/**
 * Load storage
 *
 * @memberof module:helper/upload
 */
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname)
    cb(null, path.join(__dirname, process.env.IMAGE_DIR))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

/**
 * Upload middleware
 *
 * @function
 * @memberof module:helper/upload
 */
export var upload = multer.default({ storage: storage })
