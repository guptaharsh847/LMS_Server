import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controller/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser as any);

userRouter.post("/activate-user", activateUser as any);

userRouter.post("/login", loginUser as any);

userRouter.get(
  "/logout",
  updateAccessToken as any,
  isAuthenticated as any,
  logoutUser as any
);

userRouter.get("/refresh", updateAccessToken as any);

userRouter.get("/me",updateAccessToken as any, isAuthenticated as any, getUserInfo as any);

userRouter.post("/social-auth", socialAuth as any);

userRouter.put("/update-user",updateAccessToken as any, isAuthenticated as any, updateUserInfo as any);

userRouter.put("/update-password",updateAccessToken as any,isAuthenticated as any,updatePassword as any);
userRouter.put("/update-avatar",updateAccessToken as any,isAuthenticated as any,updateProfilePicture as any);
userRouter.get("/get-users",updateAccessToken as any,isAuthenticated as any,authorizeRoles("admin"),getAllUsers as any);
userRouter.put("/update-role",updateAccessToken as any,isAuthenticated as any,authorizeRoles("admin"),updateUserRole as any);
userRouter.delete("/delete-user/:id",updateAccessToken as any,isAuthenticated as any,authorizeRoles("admin"),deleteUser as any);


export default userRouter;
