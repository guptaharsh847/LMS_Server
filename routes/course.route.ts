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
  getAllCoursesAdmin,
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
  authorizeRoles("admin"),
  editCourse as any
);
courseRouter.get("/get-course/:id", getSingleCourse as any);
courseRouter.get("/get-allcourse", getAllCourses as any);
courseRouter.get(
  "/get-course-content/:id",
 
  isAuthenticated as any,
  getCourseByUser as any
);
courseRouter.put("/add-question", isAuthenticated as any, addQuestion as any);
courseRouter.put("/add-answer", isAuthenticated as any, addAnswer as any);
courseRouter.put("/add-review/:id", isAuthenticated as any, addReview as any);
courseRouter.put(
  "/add-review-reply",
  isAuthenticated as any,
  authorizeRoles("admin"),
  addReviewReply as any
);
courseRouter.get(
  "/get-course-admin",
  isAuthenticated as any,
  authorizeRoles("admin"),
  getAllCoursesAdmin as any
);

courseRouter.post(
  "/getVdoCipherOTP",
  generateVideoUrl as any
);
courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated as any,
  authorizeRoles("admin"),
  deleteCourse as any
);

export default courseRouter;
