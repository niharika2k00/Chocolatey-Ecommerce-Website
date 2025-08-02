import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

// const __dirname = path.resolve();
// console.log(path.join(__dirname, '/uploads '))

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // image-Date.now().jpg
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// cb ---> null (for the error)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|avif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype =
    file.mimetype.startsWith("image/") &&
    (file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/avif" ||
      file.mimetype === "image/webp");

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only! Supported formats: jpg, jpeg, png, avif, webp"); // passes error
  }
}

// -----------------    MAIN FUNCTION OF MULTER      -----------------
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  console.log("Upload request received");
  console.log("File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.send(`/${req.file.filename}`);
  // http://localhost:8090/image-1624453584772.jpg ---> write in the browser it will work
});

export default router;
