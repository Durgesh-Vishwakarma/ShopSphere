import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Image } from "../components/ui/Image";
import { Select } from "../components/ui/Select";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   
   const cart = useSelector(state => state.cart);
   const { cartItems } = cart;

   const addToCartHandler = async (product, qty) => {
      dispatch(addToCart({ ...product, qty }));
      // navigate('/cart');
   };

   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
      // navigate('/cart');
   };

   const checkoutHandler = () => {
      navigate('/auth?redirect=/shipping');
   };


   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
               <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                  <Button 
                     onClick={() => navigate('/')}
                     className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                     <ArrowLeft className="w-4 h-4 mr-2" />
                     Continue Shopping
                  </Button>
               </div>

               {cartItems.length === 0 ? (
                  <Card className="p-8 text-center">
                     <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                     <Message>Your Shopping Cart is Empty</Message>
                     <Button 
                        onClick={() => navigate('/')}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                     >
                        Start Shopping
                     </Button>
                  </Card>
               ) : (
                  <div className="space-y-4">
                     {cartItems.map((item) => (
                        <Card key={item._id} className="p-6">
                           <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                 <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-20 h-20 object-cover rounded-lg"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <Link 
                                    to={`/product/${item._id}`}
                                    className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                 >
                                    {item.name}
                                 </Link>
                                 <p className="text-lg font-semibold text-gray-900 mt-1">${item.price}</p>
                              </div>
                              <div className="flex items-center space-x-3">
                                 <Select 
                                    value={item.qty}
                                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    className="w-20"
                                 >
                                    {[...Array(item.countInStock).keys()].map((idx) => (
                                       <option key={idx + 1} value={idx + 1}>
                                          {idx + 1}
                                       </option>
                                    ))}
                                 </Select>
                                 <Button 
                                    onClick={() => removeFromCartHandler(item._id)}
                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </Button>
                              </div>
                           </div>
                        </Card>
                     ))}
                  </div>
               )}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
               <Card className="p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                     <div className="flex justify-between">
                        <span className="text-gray-600">
                           Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items):
                        </span>
                     </div>
                     <div className="text-2xl font-bold text-gray-900">
                        ${cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2)}
                     </div>
                  </div>

                  <Button 
                     onClick={checkoutHandler}
                     disabled={!cartItems.length}
                     className="w-full bg-gray-900 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     size="lg"
                  >
                     Proceed To Checkout
                  </Button>
               </Card>
            </div>
         </div>
      </div>
   );
};

export default CartScreen;