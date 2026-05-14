import multer from "multer";

const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  }
  else {
    cb(
      new Error("Only PDF/JPG/PNG allowed"),
      false
    );
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});