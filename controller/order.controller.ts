import { Request, NextFunction, Response, response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import courseModel, { ICourse } from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { newOrder } from "../services/order.service";
import { getAllCoursesService } from "../services/course.service";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { redis } from "../utils/redis";

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      if(payment_info){
        if("id" in payment_info){
            const paymentIntentId = payment_info.id;
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            if(paymentIntent.status !== "succeeded"){
                return next(new ErrorHandler("Payment not authorized!", 400));
            }
        }
      }
      const user = await userModel.findById(req.user?._id);
      const courseExistInUser = user?.courses?.some(
        (course: any) => course._id.toString() === courseId
      );
      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }
      const course:ICourse | null = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      const data: any = {
        courseId: course._id,
        userId: user?._id,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Placed",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses?.push(course?._id);
      await redis.set(req.user?._id, JSON.stringify(user));

      await user?.save();
      await NotificationModel.create({
        user: user?._id,
        title: "Order Placed",
        message: `You have successfully purchased ${course?.name}`,
      });
     course.purchased =course.purchased + 1;
      res.status(201).json({
        success: true,
        order: course,
      });
      await course?.save();

      newOrder(data, res as any, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all orders--admin only
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//send stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);
// NEW payment

export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: Number(req.body.amount),
        currency: "INR",
        metadata: {
          company: "E-Learning",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
