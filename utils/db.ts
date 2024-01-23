//jshint esversion:6
const mongoose= require('mongoose');
require("dotenv").config();

const dbUrl:string = process.env.DB_URL || '';

const connectDB=async ()=>{
    try{await mongoose.connect(dbUrl).then((data:any)=>{
       
        console.log(`Database connected 
        `);
    })
}catch(error:any){
console.log(error.message);
setTimeout(connectDB,5000);
    }
}
export default connectDB;