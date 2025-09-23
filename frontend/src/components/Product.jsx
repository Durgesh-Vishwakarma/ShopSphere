import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../slices/wishlistSlice";
import toast from "react-hot-toast";
import Rating from "./Rating";

const Product = ({ product }) => {
   const dispatch = useDispatch();
   const { userInfo } = useSelector(state => state.auth);
   const { wishlistItems } = useSelector(state => state.wishlist);
   
   const isInWishlist = wishlistItems.some(item => item._id === product._id);

   const addToCartHandler = () => {
      if (product.countInStock === 0) {
         toast.error('Product is out of stock');
         return;
      }
      dispatch(addToCart({ ...product, qty: 1 }));
      toast.success('Product added to cart!');
   };

   const wishlistHandler = () => {
      if (!userInfo) {
         toast.error('Please sign in to add to wishlist');
         return;
      }
      
      if (isInWishlist) {
         dispatch(removeFromWishlist(product._id));
         toast.success('Removed from wishlist');
      } else {
         dispatch(addToWishlist(product));
         toast.success('Added to wishlist!');
      }
   };
   return (
      <motion.div
         whileHover={{ y: -4 }}
         transition={{ duration: 0.2, ease: "easeOut" }}
         className="group relative h-full"
      >
         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/50 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-50">
               <Link to={`/product/${product._id}`}>
                  <img 
                     src={product.image} 
                     alt={product.name}
                     className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
               </Link>
               
               {/* Overlay with actions */}
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                     <Link 
                        to={`/product/${product._id}`}
                        className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                        title="View Product"
                     >
                        <Eye className="w-4 h-4 text-gray-700" />
                     </Link>
                     <button 
                        onClick={wishlistHandler}
                        className={`p-2.5 rounded-full shadow-lg hover:scale-110 transition-all duration-200 backdrop-blur-sm ${
                           isInWishlist 
                              ? 'bg-red-500/90 text-white hover:bg-red-600' 
                              : 'bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-600'
                        }`}
                        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                     >
                        <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                     </button>
                     <button 
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className="p-2.5 bg-blue-600/90 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed backdrop-blur-sm"
                        title="Add to Cart"
                     >
                        <ShoppingCart className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               {/* Status Badges */}
               <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.countInStock === 0 && (
                     <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md shadow-sm">
                        Out of Stock
                     </span>
                  )}
                  {product.onSale && (
                     <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-md shadow-sm">
                        Sale
                     </span>
                  )}
               </div>

               {/* Discount Badge */}
               {product.originalPrice && (
                  <div className="absolute top-3 right-3">
                     <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                     </div>
                  </div>
               )}
            </div>

            {/* Content */}
            <div className="p-3 flex-1 flex flex-col space-y-1.5">
               {/* Category */}
               {product.category && (
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full w-fit">
                     {product.category}
                  </span>
               )}

               {/* Title */}
               <Link to={`/product/${product._id}`} className="block flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                     {product.name}
                  </h3>
               </Link>

               {/* Rating */}
               <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                     {[...Array(5)].map((_, i) => (
                        <Star
                           key={i}
                           className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                 ? 'text-yellow-400 fill-current'
                                 : 'text-gray-300'
                           }`}
                        />
                     ))}
                  </div>
                  <span className="text-xs text-gray-500">
                     ({product.numReviews})
                  </span>
               </div>

               {/* Price and Stock */}
               <div className="flex items-center justify-between pt-0.5">
                  <div className="flex flex-col">
                     {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                           ${product.originalPrice}
                        </span>
                     )}
                     <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                     </span>
                  </div>
                  
                  {/* Stock indicator */}
                  <div className="flex items-center gap-1">
                     <div className={`w-1.5 h-1.5 rounded-full ${product.countInStock > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                     <span className="text-xs text-gray-500 font-medium">
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default Product;