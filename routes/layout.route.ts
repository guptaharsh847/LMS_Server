import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controller/layout.controller";
import { updateAccessToken } from "../controller/user.controller";


const layoutRouter = express.Router();

layoutRouter.post("/create-layout",isAuthenticated as any, authorizeRoles("admin"),createLayout as any )
layoutRouter.put("/edit-layout", isAuthenticated as any, authorizeRoles("admin"),editLayout as any )
layoutRouter.get("/get-layout/:type",getLayoutByType as any )


export default layoutRouter;
