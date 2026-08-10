import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connectDB} from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import borrowRouter from "./routes/borrowRoutes.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRoutes.js";
import authorRouter from "./routes/authorRoutes.js";
import genreRouter from "./routes/genreRoutes.js";

export const app = express();
config ({path: "./config/config.env"});

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded ({extended:true}));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter); 
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // avatar files land here temporarily before being pushed to cloudinary
}));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter); // add this line

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/author", authorRouter);
app.use("/api/v1/genre", genreRouter);

connectDB();

app.use(errorMiddleware);