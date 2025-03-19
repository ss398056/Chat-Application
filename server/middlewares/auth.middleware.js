import { asyncHandler } from "../utilities/async.handler.js";
import { errorHandler } from "../utilities/error.handler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;
    console.log("token",token)
    if (!token) {
      return next(new errorHandler("Unauthorized Request/Token", 401));
    }
    const jwtData = jwt.verify(token, process.env.JWT_SECRET)
  
    req.userId = jwtData?._id;
    next();
  });