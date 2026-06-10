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
      } catch {
         // The RTK Query error object is rendered in the order summary.
      }
   };

   return (
      <div>
         <CheckoutSteps step1 step2 step3 step4 />
         
         <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping</h2>
                  <p className="text-gray-600">
                     <span className="font-medium">Address: </span>
                     {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.state} - {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
               </Card>

               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                  <p className="text-gray-600">
                     <span className="font-medium">Method: </span>
                     {cart.paymentMethod}
                  </p>
               </Card>

               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
                  {cart.cartItems.length === 0 ? (
                     <Message>Your cart is empty</Message>
                  ) : (
                     <div className="space-y-4">
                        {cart.cartItems.map((item, index) => (
                           <div key={index} className="flex items-center space-x-4 rounded-md bg-gray-50 p-4">
                              <div className="flex-shrink-0">
                                 <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-16 h-16 object-cover rounded-md"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <Link 
                                    to={`/product/${item._id || item.product}`}
                                    className="text-lg font-medium text-gray-900 hover:text-primary transition-colors"
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

            <div className="lg:col-span-1">
               <Card className="p-6 sticky top-20">
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
                     <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between">
                           <span className="text-lg font-semibold text-gray-900">Total:</span>
                           <span className="text-lg font-bold text-primary">${cart.totalPrice}</span>
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
                        className="w-full"
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
