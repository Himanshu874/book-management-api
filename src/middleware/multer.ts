import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./uploads/csv";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const baseName = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname);

    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

export const uploadFile = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith(".csv")) {
      return cb(new Error("Only CSV files are allowed"));
    }
    cb(null, true);
  },
});
