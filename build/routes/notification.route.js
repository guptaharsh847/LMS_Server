"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_controller_1 = require("../controller/notification.controller");
const auth_1 = require("../middleware/auth");
const express_1 = __importDefault(require("express"));
const notificationRouter = express_1.default.Router();
notificationRouter.get("/get-notification", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), notification_controller_1.getNotifications); //testing pending time 6:55
notificationRouter.put("/update-notification/:id", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), notification_controller_1.updateNotification); //testing pending time 7:00
exports.default = notificationRouter;
