import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayout } from "../controller/layout.controller";
import { updateAccessToken } from "../controller/user.controller";


const layoutRouter = express.Router();

layoutRouter.post("/create-layout", updateAccessToken as any,isAuthenticated as any, authorizeRoles("admin"),createLayout as any )
layoutRouter.put("/edit-layout",updateAccessToken as any, isAuthenticated as any, authorizeRoles("admin"),editLayout as any )
layoutRouter.get("/get-layout",getLayout as any )


export default layoutRouter;
