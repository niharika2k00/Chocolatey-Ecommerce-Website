
import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()


// const __dirname = path.resolve();
// console.log(path.join(__dirname, '/uploads '))

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        // image-Date.now().jpg
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    },
})


// cb ---> null (for the error)
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!');   // passes error
    }
}

// -----------------    MAIN FUNCTION OF MULTER      -----------------
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})


router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send(`/${req.file.filename}`);
    // http://localhost:8090/image-1624453584772.jpg ---> write in the browser it will work
})




export default router;