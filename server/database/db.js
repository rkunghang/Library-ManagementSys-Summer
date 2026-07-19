import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName : "LIBRARY MANAGEMENT SYATEM",
    }).then(()=>{
        console.log(`Database connected successflly`);
    }).catch(err=> {
        console.log('error connecting to database', err)
    })
};