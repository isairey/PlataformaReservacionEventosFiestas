import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import multer, { Field } from "multer";

export const fileUpload = (folderName: string) => {
  const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      // console.log(req);
      cb(null, `src/uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ) => {
    const { mimetype } = file;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    if (mimetype.startsWith("image")) return cb(null, true);
    cb(new Error("Invalid file type. Only image files are allowed!"), false);
  };

  const upload = multer({
    fileFilter,
    storage,
    limits: {
      // maximum file size 10mb
      fileSize: 10 * 1024 * 1024,
    },
  });
  //   const uploadVideo = multer({
  //     storage: storageVideo,
  //     limits: {fileSize:10 * 1024 * 1024},
  //     fileFilter: fileFilterVideo
  // });
  return upload;
};
const uploadPhotos = (folderName: string, fieldName: string) =>
  fileUpload(folderName).fields([{ name: fieldName, maxCount: 3 }]);
// const uploadVideo=(folderName:string, fieldName:string) =>
// fileUpload(folderName).upload.single(fieldName);
export { uploadPhotos };
