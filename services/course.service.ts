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
//get all courses

export const getAllCoursesService = async (res: Response) => {
    const courses = await courseModel.find().sort({createdAt: -1});
    res.status(200).json({
      success: true,
      courses
    });
  };
