"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = __importDefault(require("./utils/db"));
const http_1 = __importDefault(require("http"));
require("dotenv").config();
const cloudinary_1 = require("cloudinary");
const socketServer_1 = require("./socketServer");
const server = http_1.default.createServer(app_1.app);
//
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
(0, socketServer_1.initSocketServer)(server);
// create server
server.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
    (0, db_1.default)();
});
