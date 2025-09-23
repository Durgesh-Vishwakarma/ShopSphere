import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Image } from '../components/ui/Image';
import { Badge } from '../components/ui/Badge';
import { 
   useGetOrderDetailsQuery, 
   usePayOrderMutation, 
   useGetPayPalClientIdQuery,
   useDeliverOrderMutation
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
   const { id: orderId } = useParams();

   const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
   const [payOrder, { isLoading: payLoading }] = usePayOrderMutation();
   const [deliverOrder, { isLoading: deliverLoading }] = useDeliverOrderMutation();
   
   const { userInfo } = useSelector(state => state.auth);
   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
   const { data: paypal, isLoading: payPalLoading, error: payPalError } = useGetPayPalClientIdQuery();

   useEffect(() => {
      if (!payPalError && !payPalLoading && paypal.clientId) {
         const loadPayPalScript = async () => {
            paypalDispatch({
               type: 'resetOptions',
               value: {
                  'clientId': paypal.clientId,
                  currency: 'USD',
               }
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
         };
         
         if (order && !order.isPaid) {
            if (!window.paypal) {
               loadPayPalScript();
            }
         }
      }
   }, [order, paypal, paypalDispatch, payPalLoading, payPalError]);

   const onApproveHandler = async (data, actions) => {
      return actions.order.capture().then(async function (details) {
         try {
            await payOrder({ orderId, details });
            refetch();
            console.log('Payment successful');
         } catch (err) {
            console.error('Payment error:', err?.data?.message || err.message);
         }
      });
   };

   const onErrorHandler = err => {
      console.error('PayPal error:', err.message);
   }; 

   const createOrderHandler = (data, actions) => {
      return actions.order.create({
         purchase_units: [
            {
               amount: { value: order.totalPrice },
            },
         ],
      }).then((orderId) => {
         return orderId;
      });
   };

   const deliverOrderHandler = async () => {
      try {
         await deliverOrder(orderId);
         refetch();
         console.log('Order delivered successfully');
      } catch (err) {
         console.error('Delivery error:', err?.data?.message || err.message);
      }
   };

   if (isLoading) return <Loader />;
   
   if (error) {
      return <Message variant='danger'>{error?.data?.message || error.error}</Message>;
   }

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Order: {order._id}</h1>
         </div>

         <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
               {/* Shipping */}
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping</h2>
                  <div className="space-y-2 mb-4">
                     <p><span className="font-medium">Name:</span> {order.user.name}</p>
                     <p><span className="font-medium">Email:</span> {order.user.email}</p>
                     <p>
                        <span className="font-medium">Address:</span> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                     </p>
                  </div>
                  {order.isDelivered ? (
                     <Badge variant="success" className="bg-green-100 text-green-800">
                        Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                     </Badge>
                  ) : (
                     <Badge variant="danger" className="bg-red-100 text-red-800">
                        Not Delivered
                     </Badge>
                  )}
               </Card>

               {/* Payment Method */}
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                  <p className="mb-4">
                     <span className="font-medium">Method:</span> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                     <Badge variant="success" className="bg-green-100 text-green-800">
                        Paid on {new Date(order.paidAt).toLocaleDateString()}
                     </Badge>
                  ) : (
                     <Badge variant="danger" className="bg-red-100 text-red-800">
                        Not Paid
                     </Badge>
                  )}
               </Card>

               {/* Order Items */}
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
                  {order.orderItems.length === 0 ? (
                     <Message>Order is empty</Message>
                  ) : (
                     <div className="space-y-4">
                        {order.orderItems.map((item, index) => (
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
                                    to={`/product/${item.product}`}
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
                  
                  <div className="space-y-3 mb-6">
                     <div className="flex justify-between">
                        <span className="text-gray-600">Items:</span>
                        <span className="font-medium">${order.itemsPrice}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium">${order.shippingPrice}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Tax:</span>
                        <span className="font-medium">${order.taxPrice}</span>
                     </div>
                     <div className="border-t pt-3">
                        <div className="flex justify-between">
                           <span className="text-lg font-semibold text-gray-900">Total:</span>
                           <span className="text-lg font-bold text-orange-500">${order.totalPrice}</span>
                        </div>
                     </div>
                  </div>

                  {!userInfo?.isAdmin && !order.isPaid && (
                     <div className="space-y-4">
                        {payLoading && <Loader />}
                        {isPending ? (
                           <Loader />
                        ) : (
                           <div className="w-full">
                              <PayPalButtons
                                 createOrder={createOrderHandler}
                                 onApprove={onApproveHandler}
                                 onError={onErrorHandler}
                              />
                           </div>
                        )}
                     </div>
                  )}
                  
                  {deliverLoading && <Loader />}
                  {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                     <div className="mt-4">
                        <Button 
                           onClick={deliverOrderHandler}
                           className="w-full bg-gray-900 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition-colors"
                           size="lg"
                        >
                           Mark As Delivered
                        </Button>
                     </div>
                  )}
               </Card>
            </div>
         </div>
      </div>
   );
};

export default OrderScreen;