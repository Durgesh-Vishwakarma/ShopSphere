import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Image } from '../components/ui/Image';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCart } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const cart = useSelector(state => state.cart);

   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

   useEffect(() => {
      if (!cart.shippingAddress.address || !cart.shippingAddress.city || !cart.shippingAddress.state || !cart.shippingAddress.postalCode || !cart.shippingAddress.country) {
         navigate('/shipping');
      }
      else if (!cart.paymentMethod) {
         navigate('/payment');
      }
   }, [
      cart.shippingAddress.address, 
      cart.shippingAddress.city, 
      cart.shippingAddress.state, 
      cart.shippingAddress.postalCode, 
      cart.shippingAddress.country, 
      cart.paymentMethod, 
      navigate
   ]);

   const placeOrderHandler = async () => {
      try {
         const responseData = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
         }).unwrap();

         dispatch(clearCart());
         navigate(`/order/${responseData._id}`);
      } catch (error) {
         // Handle error silently or with toast notification
      }
   };

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <CheckoutSteps step1 step2 step3 step4 />
         
         <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
               {/* Shipping */}
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping</h2>
                  <p className="text-gray-600">
                     <span className="font-medium">Address: </span>
                     {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.state} - {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
               </Card>

               {/* Payment Method */}
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                  <p className="text-gray-600">
                     <span className="font-medium">Method: </span>
                     {cart.paymentMethod}
                  </p>
               </Card>

               {/* Order Items */}
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
                  {cart.cartItems.length === 0 ? (
                     <Message>Your cart is empty</Message>
                  ) : (
                     <div className="space-y-4">
                        {cart.cartItems.map((item, index) => (
                           <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                              <div className="flex-shrink-0">
                                 <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <Link 
                                    to={`/products/${item.product}`}
                                    className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                 >
                                    {item.name}
                                 </Link>
                              </div>
                              <div className="text-right">
                                 <p className="text-sm text-gray-600">
                                    {item.qty} x ${item.price} = <span className="font-semibold">${item.qty * item.price}</span>
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
               <Card className="p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                     <div className="flex justify-between">
                        <span className="text-gray-600">Items:</span>
                        <span className="font-medium">${cart.itemsPrice}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium">${cart.shippingPrice}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Tax:</span>
                        <span className="font-medium">${cart.taxPrice}</span>
                     </div>
                     <div className="border-t pt-4">
                        <div className="flex justify-between">
                           <span className="text-lg font-semibold text-gray-900">Total:</span>
                           <span className="text-lg font-bold text-orange-500">${cart.totalPrice}</span>
                        </div>
                     </div>
                  </div>

                  {error && (
                     <div className="mb-4">
                        <Message variant='danger'>{error?.data?.message || 'An error occurred'}</Message>
                     </div>
                  )}

                  <div className="space-y-3">
                     <Button 
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                        className="w-full bg-gray-900 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        size="lg"
                     >
                        Place Order
                     </Button>
                     {isLoading && (
                        <div className="flex justify-center">
                           <Loader />
                        </div>
                     )}
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
}

export default PlaceOrderScreen;