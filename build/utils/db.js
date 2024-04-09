"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//jshint esversion:6
const mongoose = require('mongoose');
require("dotenv").config();
const dbUrl = process.env.DB_URL || '';
const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data) => {
            console.log(`Database connected 
        `);
        });
    }
    catch (error) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
};
exports.default = connectDB;
