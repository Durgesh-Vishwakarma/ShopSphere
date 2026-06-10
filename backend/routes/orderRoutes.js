import express from "express";
const router = express.Router();
import { 
   addOrderItems, 
   getMyOrders, 
   getOrderById, 
   updateOrderToPaid, 
   updateOrderToDelivered, 
   getOrders 
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { validateObjectId, validateOrder, validatePayment } from '../middleware/validationMiddleware.js';


router.route('/').post(protect, validateOrder, addOrderItems).get(protect, admin, getOrders);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, validateObjectId, getOrderById);

router.route('/:id/pay').put(protect, validateObjectId, validatePayment, updateOrderToPaid);

router.route('/:id/deliver').put(protect, admin, validateObjectId, updateOrderToDelivered);


export default router;
