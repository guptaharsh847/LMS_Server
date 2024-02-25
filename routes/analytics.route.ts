import { updateAccessToken } from "../controller/user.controller";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controller/analytics.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import express from "express";

const analyticsRouter = express.Router();

analyticsRouter.get(
    "/get-users-analytics",updateAccessToken as any,
    isAuthenticated as any,
    authorizeRoles("admin"),
    getUserAnalytics as any

)
analyticsRouter.get(
    "/get-courses-analytics",updateAccessToken as any,
    isAuthenticated as any,
    authorizeRoles("admin"),
    getCourseAnalytics as any

)
analyticsRouter.get(
    "/get-orders-analytics",updateAccessToken as any,
    isAuthenticated as any,
    authorizeRoles("admin"),
    getOrderAnalytics as any

)

export default analyticsRouter;