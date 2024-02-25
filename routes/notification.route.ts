
import { updateAccessToken } from "../controller/user.controller";
import { getNotifications, updateNotification } from "../controller/notification.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import express from "express";

const notificationRouter = express.Router();

notificationRouter.get("/get-notification",updateAccessToken as any, isAuthenticated as any,
authorizeRoles("admin") as any,
getNotifications as any ) //testing pending time 6:55

notificationRouter.put("/update-notification/:id",updateAccessToken as any, isAuthenticated as any,
authorizeRoles("admin") as any,
updateNotification as any ) //testing pending time 7:00


export default notificationRouter;