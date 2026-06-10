import express from "express";
const router = express.Router();
import { 
   getProducts, 
   getProductById, 
   createProduct, 
   updateProduct, 
   deleteProduct,
   createProductReview,
   getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateObjectId, validateProduct, validateReview } from '../middleware/validationMiddleware.js';


// router.get('/', getProducts);

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/top').get(getTopProducts);

router.route('/:id')
   .get(validateObjectId, getProductById)
   .put(protect, admin, validateObjectId, validateProduct, updateProduct)
   .delete(protect, admin, validateObjectId, deleteProduct);

router.route('/:id/reviews').post(protect, validateObjectId, validateReview, createProductReview);


export default router;
