import express from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from "../controller/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser as any);

userRouter.post("/activate-user", activateUser as any);

userRouter.post("/login", loginUser as any);

userRouter.get(
  "/logout",
  isAuthenticated as any,
  authorizeRoles("user"),
  logoutUser as any
);

userRouter.get("/refresh", updateAccessToken as any);

userRouter.get("/me", isAuthenticated as any, getUserInfo as any);

userRouter.post("/social-auth", socialAuth as any);

userRouter.put("/update-user", isAuthenticated as any, updateUserInfo as any);

userRouter.put("/update-password",isAuthenticated as any,updatePassword as any);
userRouter.put("/update-avatar",isAuthenticated as any,updateProfilePicture as any);


export default userRouter;
