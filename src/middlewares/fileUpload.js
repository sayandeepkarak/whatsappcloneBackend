import multer, { diskStorage } from "multer";
import path from "path";

const storagePath = path.join(__dirname, "../../uploads");

const storage = diskStorage({
  destination: (req, file, callback) => callback(null, storagePath),
  filename: (req, file, callback) => {
    const imageName = `${Date.now()}${path.extname(file.originalname)}`;
    callback(null, imageName);
  },
});

const uploadImage = (fieldName) => {
  return multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 2 },
  }).single(fieldName);
};

export { uploadImage };
