import { app } from "./app";
import connectDB from "./utils/db";
import http from "http";
require("dotenv").config();
import {v2 as cloudinary} from "cloudinary";
import { initSocketServer } from "./socketServer";
const server = http.createServer(app);

//
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
})

initSocketServer(server);
// create server
server.listen(process.env.PORT,()=>{
    console.log(`Server is connected with port ${process.env.PORT}` );
    connectDB();
}); 