"use strict";
//get user by id
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCoursesService = exports.createCourse = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
;
const course_model_1 = __importDefault(require("../models/course.model"));
exports.createCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (data, res, next) => {
    const course = await course_model_1.default.create(data);
    res.status(201).json({
        success: true,
        course
    });
});
//get all courses
const getAllCoursesService = async (res) => {
    const courses = await course_model_1.default.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        courses
    });
};
exports.getAllCoursesService = getAllCoursesService;
