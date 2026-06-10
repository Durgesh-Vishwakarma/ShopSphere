import asyncHandler from '../middleware/asyncHandler.js';
import Product from "../models/productModel.js";


// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
   const pageSize = Number(process.env.PAGINATION_LIMIT) || 12;
   const page = Math.max(Number(req.query.page || req.query.pageNumber) || 1, 1);
   const keyword = typeof req.query.keyword === 'string' ? req.query.keyword.trim() : '';
   const searchFilter = keyword ? { $text: { $search: keyword } } : {};
   const projection = keyword
      ? { reviews: 0, score: { $meta: 'textScore' } }
      : { reviews: 0 };
   const sort = keyword
      ? { score: { $meta: 'textScore' }, createdAt: -1 }
      : { createdAt: -1 };

   const [count, products] = await Promise.all([
      Product.countDocuments(searchFilter),
      Product.find(searchFilter, projection)
         .sort(sort)
         .limit(pageSize)
         .skip(pageSize * (page - 1))
         .populate('user', 'name email')
         .lean(),
   ]);

   res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
      pageSize,
   });
});


// @desc   Fetch a product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id).lean();

   if (product) {
      return res.json(product);
   }

   else {
      res.status(404);
      throw new Error('Resource not found');
   }
});


// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
   
   const product = new Product({
      name: 'Sample Name',
      price: 0.00,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description'
   });

   const createdProduct = await product.save();
   res.status(201).json(createdProduct);
});


// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
   
   const { name, price, description, image, brand, category, countInStock } = req.body;

   const product = await Product.findById(req.params.id);

   if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
   }

   else {
      res.status(404);
      throw new Error('Resource not found');
   }
});


// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
   
   const product = await Product.findById(req.params.id);

   if (product) {
      await Product.deleteOne({ _id: product._id })
      res.status(200).json({ message: 'Product deleted' });
   }

   else {
      res.status(404);
      throw new Error('Resource not found');
   }
});


// @desc   Create a new review
// @route  POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
   
   const { rating, comment } = req.body;
   const product = await Product.findById(req.params.id);

   if (product) {
      const reviewed = product.reviews.find(review =>
         review.user.toString() === req.user._id.toString());

      if (reviewed) {
         res.status(400);
         throw new Error('Product already reviewed');
      }

      const review = {
         user: req.user._id,
         name: req.user.name,
         rating: Number(rating),
         comment
      };
      
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce(
         (acc, review) => acc + review.rating, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review Added' });
   }

   else {
      res.status(404);
      throw new Error('Resource not found');
   }
});


// @desc   get top rated products
// @route  GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({})
      .select('_id name image imageVariants price rating numReviews')
      .sort({ rating: -1 })
      .limit(3)
      .lean();

   res.status(200).json(products);
});


export { 
   getProducts, 
   getProductById, 
   createProduct, 
   updateProduct, 
   deleteProduct, 
   createProductReview,
   getTopProducts
};