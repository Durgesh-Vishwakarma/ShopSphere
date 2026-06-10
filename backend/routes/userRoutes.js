import express from "express";
const router = express.Router();
import { 
   authUser, 
   registerUser, 
   logoutUser, 
   getUserProfile, 
   updateUserProfile, 
   getUsers, 
   getUserById, 
   deleteUser, 
   updateUser 
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { authLimiter } from '../middleware/rateLimitMiddleware.js';
import {
   validateAdminUserUpdate,
   validateObjectId,
   validateProfileUpdate,
   validateUserLogin,
   validateUserRegistration,
} from '../middleware/validationMiddleware.js';


router.route('/').post(authLimiter, validateUserRegistration, registerUser).get(protect, admin, getUsers);

router.post('/logout', protect, logoutUser);

router.post('/auth', authLimiter, validateUserLogin, authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, validateProfileUpdate, updateUserProfile);

router.route('/:id')
   .delete(protect, admin, validateObjectId, deleteUser)
   .get(protect, admin, validateObjectId, getUserById)
   .put(protect, admin, validateObjectId, validateAdminUserUpdate, updateUser);


export default router;
