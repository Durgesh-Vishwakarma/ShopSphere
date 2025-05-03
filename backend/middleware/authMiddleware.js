import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
   let token;

   // Check for token in Authorization header
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
   ) {
      token = req.headers.authorization.split(' ')[1];
   }
   // OPTIONAL: fallback to cookie if you want to support both
   // else if (req.cookies && req.cookies.jwt) {
   //    token = req.cookies.jwt;
   // }

   if (token) {
      try {
         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
         req.user = await User.findById(decodedToken.userId).select('-password');
         next();
      } catch (error) {
         console.error(error);
         res.status(401);
         throw new Error('Not authorised, token failed');
      }
   } else {
      res.status(401);
      throw new Error('Not authorised, no token');
   }
});

const admin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next();
   } else {
      res.status(401);
      throw new Error('Not authorised as admin');
   }
};

export { protect, admin };