import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  SignRefreshToken(): unknown;
  SignAccessToken(): unknown;
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
};
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid mail",
      },
      unique: true,
    },
    password: {
      type: String,
      // required: [true, "Please Enter your Email"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

//Hash Password before String
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("Password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
  // console.log("pass:0"+this.password);
  
});

//compare password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  this.password=await bcrypt.hash(this.password, 10); //hashing is done here
  return await bcrypt.compare(enteredPassword, this.password);
};

//sign access token
userSchema.methods.SignAccessToken= function(){
  return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN || '',{
    expiresIn:"5m"
  });
};


//sign refresh token
userSchema.methods.SignRefreshToken= function(){
  return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN || '',{
    expiresIn:"3d"
  });
};



const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
