import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import RevokedToken from '../models/revokedTokenModel.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
   let token;
   const jwtSecret = process.env.JWT_SECRET;

   if (!jwtSecret) {
      res.status(500);
      throw new Error('JWT_SECRET env var not set');
   }

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
         const decodedToken = jwt.verify(token, jwtSecret);

         if (decodedToken?.jti) {
            const revokedToken = await RevokedToken.findOne({ jti: decodedToken.jti }).lean();
            if (revokedToken) {
               res.status(401);
               throw new Error('Not authorised, token revoked');
            }
         }

         req.authToken = decodedToken;
         req.user = await User.findById(decodedToken.userId).select('-password');

         if (!req.user) {
            res.status(401);
            throw new Error('Not authorised, user not found');
         }

         next();
      } catch {
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
      res.status(403);
      throw new Error('Not authorised as admin');
   }
};

export { protect, admin };
