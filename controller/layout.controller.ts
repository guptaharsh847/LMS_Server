import { Request, NextFunction, Response, response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";
import NotificationModel from "../models/notification.model";
//create layout

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`Type ${type} already exist`, 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          type:"Banner",
          banner:{
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,}
        };
        await LayoutModel.create(banner);
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItem = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.create({ type: "FAQ", faq: faqItem });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItem = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.create({
          type: "Categories",
          categories: categoriesItem,
        });
      }
      //create a  notification
      await NotificationModel.create({
        user: req.user?._id,
        title: "Layout created",
        message: "A new layout has been created",
      });

      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//edit layout

export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
     
      if (type === "Banner") {
        const bannerData:any = await LayoutModel.findOne({ type:"Banner" });
        const { image, title, subTitle } = req.body;
        const data = image.startsWith("https") ? bannerData :
        await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        // if (bannerData){
        //     await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        //     // await LayoutModel.findOneAndDelete({ type:"Banner" });
        // }
        
        const banner = {
          type: "Banner",
          image: {
            public_id:image.startsWith("https") ? bannerData.banner.image.public_id :data?.public_id,
            url: image.startsWith("https") ? bannerData.banner.image.url :data.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.findByIdAndUpdate( bannerData._id,{banner});
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const FaqItems=await LayoutModel.findOne({ type: "FAQ" });
        const faqItem = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(FaqItems?._id,{ type: "FAQ", faq: faqItem });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData=await LayoutModel.findOne({ type: "Categories" });
        const categoriesItem = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(categoriesData?._id,{
          type: "Categories",
          categories: categoriesItem,
        });
      }
      //create a  notification
      await NotificationModel.create({
        user: req.user?._id,
        title: "Layout Edited",
        message: `Layout ${type} Edited successfully`,
      });

      res.status(201).json({
        success: true,
        message: `Layout ${type} Edited successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get layout by type

export const getLayoutByType = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { type } = req.params;
        const layout = await LayoutModel.findOne({ type });
        if (!layout) {
          return next(new ErrorHandler(`Layout ${type} not found`, 404));
        }
        res.status(200).json({
          success: true,
          layout,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    });