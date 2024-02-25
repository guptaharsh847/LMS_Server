import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReview,
  addReviewReply,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controller/course.controller";
import express from "express";
import { updateAccessToken } from "../controller/user.controller";

const courseRouter = express.Router();
courseRouter.post(
  "/create-course",
  updateAccessToken as any,
  isAuthenticated as any,
  authorizeRoles("admin"),
  uploadCourse as any
);
courseRouter.put(
  "/edit-course/:id",
  updateAccessToken as any,
  isAuthenticated as any,
  authorizeRoles("admin"),
  editCourse as any
);
courseRouter.get("/get-course/:id", getSingleCourse as any);
courseRouter.get("/get-allcourse", getAllCourses as any);
courseRouter.get(
  "/get-course-content/:id",
  updateAccessToken as any,
  isAuthenticated as any,
  getCourseByUser as any
);
courseRouter.put("/add-question",updateAccessToken as any, isAuthenticated as any, addQuestion as any);
courseRouter.put("/add-answer",updateAccessToken as any, isAuthenticated as any, addAnswer as any);
courseRouter.put("/add-review/:id",updateAccessToken as any, isAuthenticated as any, addReview as any);
courseRouter.put(
  "/add-review-reply",updateAccessToken as any,
  isAuthenticated as any,
  authorizeRoles("admin"),
  addReviewReply as any
);
courseRouter.get(
  "/get-courses",updateAccessToken as any,
  isAuthenticated as any,
  authorizeRoles("admin"),
  getAllCourses as any
);
courseRouter.post(
  "/getVdoCipherOTP",
  generateVideoUrl as any
);
courseRouter.delete(
  "/delete-course/:id",updateAccessToken as any,
  isAuthenticated as any,
  authorizeRoles("admin"),
  deleteCourse as any
);

export default courseRouter;
