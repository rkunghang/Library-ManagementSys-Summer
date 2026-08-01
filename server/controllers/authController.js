import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {});