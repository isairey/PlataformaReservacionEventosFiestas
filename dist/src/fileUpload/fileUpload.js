"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhotos = exports.fileUpload = void 0;
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
const fileUpload = (folderName) => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            // console.log(req);
            cb(null, `src/uploads/${folderName}`);
        },
        filename: (req, file, cb) => {
            cb(null, (0, uuid_1.v4)() + "-" + file.originalname);
        },
    });
    const fileFilter = (req, file, cb) => {
        const { mimetype } = file;
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "application/pdf",
        ];
        if (mimetype.startsWith("image"))
            return cb(null, true);
        cb(new Error("Invalid file type. Only image files are allowed!"), false);
    };
    const upload = (0, multer_1.default)({
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
exports.fileUpload = fileUpload;
const uploadPhotos = (folderName, fieldName) => (0, exports.fileUpload)(folderName).fields([{ name: fieldName, maxCount: 3 }]);
exports.uploadPhotos = uploadPhotos;
