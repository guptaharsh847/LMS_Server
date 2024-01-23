import { createOrder } from "../controller/order.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated as any,createOrder as any ) 


export default orderRouter;