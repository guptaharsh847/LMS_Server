import { updateAccessToken } from "../controller/user.controller";
import { createOrder, getAllOrders } from "../controller/order.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated as any,createOrder as any ) 
orderRouter.get("/get-orders", isAuthenticated as any,authorizeRoles("admin"),getAllOrders as any ) 


export default orderRouter;