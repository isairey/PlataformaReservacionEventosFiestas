"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOldImage = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const removeOldImage = function (image, folder) {
    let filePath = path_1.default.resolve() + `/src/uploads/${folder}/${image}`;
    fs_1.default.unlinkSync(filePath);
};
exports.removeOldImage = removeOldImage;
