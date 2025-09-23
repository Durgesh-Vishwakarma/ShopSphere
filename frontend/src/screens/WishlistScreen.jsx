import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { removeFromWishlist, clearWishlist } from '../slices/wishlistSlice';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Image } from '../components/ui/Image';
import Rating from '../components/Rating';
import Meta from '../components/Meta';

const WishlistScreen = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { userInfo } = useSelector(state => state.auth);
   const { wishlistItems } = useSelector(state => state.wishlist);

   // Redirect to login if not authenticated
   if (!userInfo) {
      return (
         <>
            <Meta title="Wishlist - Login Required | ShopSphere" />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
               <Card className="max-w-md mx-auto p-8 text-center">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign in to view your wishlist</h2>
                  <p className="text-gray-600 mb-6">
                     You need to be logged in to save and view your favorite products.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                     <Link to="/auth">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                           Sign In
                        </Button>
                     </Link>
                     <Link to="/">
                        <Button variant="outline" className="w-full">
                           Continue Shopping
                        </Button>
                     </Link>
                  </div>
               </Card>
            </div>
         </>
      );
   }

   const removeFromWishlistHandler = (id) => {
      dispatch(removeFromWishlist(id));
      toast.success('Removed from wishlist');
   };

   const clearWishlistHandler = () => {
      dispatch(clearWishlist());
      toast.success('Wishlist cleared');
   };

   const addToCartHandler = (product) => {
      if (product.countInStock === 0) {
         toast.error('Product is out of stock');
         return;
      }
      dispatch(addToCart({ ...product, qty: 1 }));
      toast.success('Added to cart!');
   };

   return (
      <>
         <Meta title="My Wishlist | ShopSphere" />
         
         <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                     <Link 
                        to="/"
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                     >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Shop
                     </Link>
                  </div>
                  
                  <div className="text-center">
                     <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-3">
                        <Heart className="w-8 h-8 text-red-500" />
                        <span>My Wishlist</span>
                     </h1>
                     <p className="text-gray-600 mt-2">
                        Welcome back, {userInfo.name}! You have {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                     </p>
                  </div>
                  
                  <div className="w-24"></div> {/* Spacer for centering */}
               </div>

               {/* Wishlist Content */}
               {wishlistItems.length === 0 ? (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-center py-16"
                  >
                     <Card className="max-w-md mx-auto p-8">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-6">
                           Browse products and click the <Heart className="w-4 h-4 inline mx-1" /> icon to add items to your wishlist!
                        </p>
                        <Link to="/">
                           <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                              Start Shopping
                           </Button>
                        </Link>
                     </Card>
                  </motion.div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {wishlistItems.map((item, index) => (
                        <motion.div
                           key={item._id}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.1 }}
                           className="group"
                        >
                           <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                              {/* Image */}
                              <div className="relative">
                                 <Link to={`/product/${item._id}`}>
                                    <Image 
                                       src={item.image} 
                                       alt={item.name}
                                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                 </Link>
                                 
                                 {/* Remove button */}
                                 <button
                                    onClick={() => removeFromWishlistHandler(item._id)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                                    title="Remove from wishlist"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>

                                 {/* Stock status */}
                                 <div className="absolute top-3 left-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                       item.countInStock > 0 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-red-100 text-red-800'
                                    }`}>
                                       {item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                 </div>
                              </div>

                              {/* Content */}
                              <div className="p-4 space-y-3">
                                 <Link to={`/product/${item._id}`}>
                                    <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2">
                                       {item.name}
                                    </h3>
                                 </Link>

                                 <Rating value={item.rating} text={`${item.numReviews} reviews`} />

                                 <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">
                                       ${item.price}
                                    </span>
                                 </div>

                                 {/* Actions */}
                                 <div className="flex space-x-2 pt-2">
                                    <Link 
                                       to={`/product/${item._id}`}
                                       className="flex-1"
                                    >
                                       <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="w-full"
                                       >
                                          View Details
                                       </Button>
                                    </Link>
                                    <Button 
                                       size="sm"
                                       disabled={item.countInStock === 0}
                                       onClick={() => addToCartHandler(item)}
                                       className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-1"
                                    >
                                       <ShoppingCart className="w-4 h-4" />
                                       <span>Add to Cart</span>
                                    </Button>
                                 </div>
                              </div>
                           </Card>
                        </motion.div>
                     ))}
                  </div>
               )}

               {/* Bottom Actions */}
               {wishlistItems.length > 0 && (
                  <div className="mt-8 text-center">
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                           variant="outline"
                           onClick={clearWishlistHandler}
                           className="flex items-center space-x-2"
                        >
                           <Trash2 className="w-4 h-4" />
                           <span>Clear Wishlist</span>
                        </Button>
                        <Link to="/">
                           <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                              Continue Shopping
                           </Button>
                        </Link>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default WishlistScreen;