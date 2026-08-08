import {app} from "./app.js";
import cloudinary from "cloudinary";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
}); //this authenticates all cloudinary requests app-wide

notifyUsers(); // starts the daily due-date reminder job
removeUnverifiedAccounts(); // starts the 30-min unverified-account cleanup job

app.listen (process.env.PORT, ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
});
