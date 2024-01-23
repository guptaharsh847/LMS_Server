import { Request, Response, NextFunction } from "express";
require("dotenv").config();
import userModel, { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions  {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | "undefined";
  secure?: boolean;
}
 //parse environment variable to intrigate with fallback

  const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);
//options for cookies
export const accessTokenOptions : ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire*60*60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken() as any;
  const refreshToken = user.SignRefreshToken() as any;

  //upload session to redis
redis.set(user._id,JSON.stringify(user) as any);
 

  if(process.env.NODE_ENV ==='production'){
    accessTokenOptions.secure=true;
  
  }
  res.cookie("access_token", accessToken);//made edits in cookie
  res.cookie("refresh_token", refreshToken);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
