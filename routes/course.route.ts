import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
    addAnswer,
    addQuestion,
  addReview,
  addReviewReply,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controller/course.controller";
import express from "express";

const courseRouter = express.Router();
courseRouter.post(
  "/create-course",
  isAuthenticated as any,
  authorizeRoles("admin"),
  uploadCourse as any
);
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated as any,
  authorizeRoles("user"),
  editCourse as any
);
courseRouter.get("/get-course/:id", getSingleCourse as any);
courseRouter.get("/get-allcourse", getAllCourses as any);
courseRouter.get(
  "/get-course-content/:id",
  isAuthenticated as any,
  getCourseByUser as any
);
courseRouter.put(
  "/add-question",
  isAuthenticated as any,
  addQuestion as any
);
courseRouter.put(
  "/add-answer",
  isAuthenticated as any,
  addAnswer as any
);
courseRouter.put(
  "/add-review/:id",
  isAuthenticated as any,
  addReview as any
);
courseRouter.put(
  "/add-review-reply",
  isAuthenticated as any,
  authorizeRoles("admin"),
  addReviewReply as any
);

export default courseRouter;
