import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // size 5MB
  fileFilter: function (req, file, cb) {
    // if type
    if (!file.originalname.match(/\.(gif|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file (GIF, JPEG, PNG)"));
    }
    // if size
    if (file.size > 5000000) {
      return cb(new Error("Image size must be less than 5MB"));
    }

    cb(null, true);
  },
});

export default upload;
