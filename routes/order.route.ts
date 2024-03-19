import { updateAccessToken } from "../controller/user.controller";
import { createOrder, getAllOrders, newPayment, sendStripePublishableKey } from "../controller/order.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import express from "express";
import { setServers } from "dns";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated as any,createOrder as any ) 
orderRouter.get("/get-orders", isAuthenticated as any,authorizeRoles("admin"),getAllOrders as any ) 
orderRouter.get("/payment/stripePublishableKey", sendStripePublishableKey as any)
orderRouter.post("/payment", isAuthenticated as any, newPayment as any)


export default orderRouter;