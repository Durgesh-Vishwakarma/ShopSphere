import asyncHandler from '../middleware/asyncHandler.js';
import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';
import { verifyPayPalOrder } from '../utils/paypal.js';

const roundToTwoDecimals = (value) => Number((Math.round(value * 100) / 100).toFixed(2));

const calculateOrderPrices = (itemsPrice) => {
   const taxPrice = roundToTwoDecimals(itemsPrice * 0.15);
   const shippingPrice = itemsPrice > 100 ? 0 : 10;
   const totalPrice = roundToTwoDecimals(itemsPrice + taxPrice + shippingPrice);

   return { taxPrice, shippingPrice, totalPrice };
};

const ensureOrderAccess = (order, user) => {
   const orderUserId = order.user?._id || order.user;

   if (user.isAdmin || orderUserId.toString() === user._id.toString()) {
      return;
   }

   const error = new Error('You are not allowed to access this order');
   error.statusCode = 403;
   throw error;
};

const normalizeOrderItemId = (item) => item._id || item.product;

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
   
   const { 
      orderItems, 
      shippingAddress, 
      paymentMethod,
   } = req.body;

   if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('Order items not found');
   }

   const requestedItems = orderItems.map((item) => ({
      productId: normalizeOrderItemId(item),
      qty: Number(item.qty),
   }));
   const uniqueProductIds = [...new Set(requestedItems.map((item) => item.productId))];

   if (uniqueProductIds.length !== requestedItems.length) {
      res.status(400);
      throw new Error('Duplicate products are not allowed in one order');
   }

   const products = await Product.find({ _id: { $in: uniqueProductIds } })
      .select('name image price countInStock')
      .lean();

   if (products.length !== uniqueProductIds.length) {
      res.status(400);
      throw new Error('One or more products in the order were not found');
   }

   const productsById = new Map(products.map((product) => [product._id.toString(), product]));

   const safeOrderItems = requestedItems.map((item) => {
      const product = productsById.get(item.productId.toString());

      if (item.qty > product.countInStock) {
         res.status(400);
         throw new Error(`${product.name} has only ${product.countInStock} item(s) in stock`);
      }

      return {
         name: product.name,
         qty: item.qty,
         image: product.image,
         price: product.price,
         product: product._id,
      };
   });

   const itemsPrice = roundToTwoDecimals(
      safeOrderItems.reduce((sum, item) => sum + item.price * item.qty, 0)
   );
   const { taxPrice, shippingPrice, totalPrice } = calculateOrderPrices(itemsPrice);

   const order = new Order({
      orderItems: safeOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
   });

   const createdOrder = await order.save();

   res.status(201).json(createdOrder);

});


// @desc   Get the orders of logged in user
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
   
   const myOrders = await Order.find({ user: req.user._id }).lean();
   res.status(200).json(myOrders);

});


// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
   
   const order = await Order.findById(req.params.id).populate('user', 'name email');

   if (order) {
      ensureOrderAccess(order, req.user);
      res.status(200).json(order);
   }

   else {
      res.status(404);
      throw new Error('Order not found');
   }
});


// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
   
   const order = await Order.findById(req.params.id);

   if (order) {
      ensureOrderAccess(order, req.user);

      if (order.isPaid) {
         return res.status(200).json(order);
      }

      if (!req.body?.id) {
         res.status(400);
         throw new Error('PayPal order id is required');
      }

      const paypalOrder = await verifyPayPalOrder(req.body.id);

      if (!paypalOrder.verified) {
         res.status(400);
         throw new Error(`Payment not completed. Current PayPal status: ${paypalOrder.status}`);
      }

      if (paypalOrder.amount && roundToTwoDecimals(paypalOrder.amount) !== roundToTwoDecimals(order.totalPrice)) {
         res.status(400);
         throw new Error('Payment amount does not match order total');
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
         id: req.body.id,
         status: paypalOrder.status,
         update_time: paypalOrder.updateTime || req.body?.update_time,
         email_address: paypalOrder.payerEmail || req.body?.payer?.email_address
      };

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
   }

   else {
      res.status(404);
      throw new Error('Order not found');
   }
});


// @desc   Update order delivered
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
   
   const order = await Order.findById(req.params.id);

   if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
   }

   else {
      res.status(404);
      throw new Error('Order not found');
   }
});


// @desc   Get all orders
// @route  GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
   const page = Math.max(Number(req.query.page) || 1, 1);
   const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);

   const [orders, count] = await Promise.all([
      Order.find({})
         .populate('user', 'id name')
         .limit(limit)
         .skip(limit * (page - 1))
         .lean(),
      Order.countDocuments(),
   ]);

   res.status(200).json({
      orders,
      page,
      pages: Math.ceil(count / limit),
      total: count,
   });
});


export { 
   addOrderItems, 
   getMyOrders, 
   getOrderById, 
   updateOrderToPaid, 
   updateOrderToDelivered, 
   getOrders 
};
