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
      <div>
         <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
               <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-semibold text-gray-950">Shopping Cart</h1>
                  <Button 
                     onClick={() => navigate('/')}
                     variant="outline"
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
                        className="mt-4"
                     >
                        Start Shopping
                     </Button>
                  </Card>
               ) : (
                  <div className="space-y-4">
                     {cartItems.map((item) => (
                        <Card key={item._id} className="p-4 sm:p-6">
                           <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                              <div className="flex-shrink-0">
                                 <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="h-20 w-20 rounded-md object-cover"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <Link 
                                    to={`/product/${item._id}`}
                                    className="text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                                 >
                                    {item.name}
                                 </Link>
                                 <p className="text-lg font-semibold text-gray-900 mt-1">${item.price}</p>
                              </div>
                              <div className="flex items-center gap-3">
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
                                    variant="ghost"
                                    size="icon"
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
               <Card className="sticky top-20 p-6">
                  <h2 className="text-xl font-semibold text-gray-950 mb-4">Order Summary</h2>
                  
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
                     className="w-full"
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
