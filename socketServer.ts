import {Server as SocketIOServer} from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
    const io = new SocketIOServer(server)
    io.on("connection", (socket) => {
        console.log("User connected");
        //Listen for notification event from the front end
        socket.on("notification", (data) => {
           
            //Emit the notification event to all connected clients
            io.emit("newNotification", data);
        });
        socket.on("disconnect", () => {

            console.log("User disconnected");
        })
    })

}