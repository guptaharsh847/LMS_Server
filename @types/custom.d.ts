
import { IUser } from "../models/user.model";
import { Express } from "express";
declare global{
    module Express{
        interface Request{
            user?:IUser

        }
    }
}