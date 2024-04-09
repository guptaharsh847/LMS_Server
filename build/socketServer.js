"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
const initSocketServer = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("User connected");
        //Listen for notification event from the front end
        socket.on("notification", (data) => {
            //Emit the notification event to all connected clients
            io.emit("newNotification", data);
        });
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};
exports.initSocketServer = initSocketServer;
