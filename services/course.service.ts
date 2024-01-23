//get user by id

import { NextFunction, Response } from "express";
import { redis } from "../utils/redis";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
;
import courseModel from "../models/course.model";

export const createCourse  =CatchAsyncError( async (data: any, res: Response,next:NextFunction) => {
    const course = await courseModel.create(data);
    res.status(201).json({
      success: true,
      course
    });
 
});
