import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { IUser } from "models/user.model";
import { updateAccessToken } from "../controller/user.controller";

//authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(new ErrorHandler("Login to access this resource", 400));
    }

    const decoded = jwt.decode(access_token) as JwtPayload;
    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }
    //check if access token is expired
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await updateAccessToken(req as any, res as any, next);
      } catch (error) {
        return next(error);
      }
    } else {
      const user = await redis.get(decoded.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      req.user = JSON.parse(user);
      next();
    }
  }
);
// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access`,
          403
        )
      );
    }
    next();
  };
};
