import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Package, MapPin, Calendar, Truck } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Meta from '../components/Meta';

const TrackOrderScreen = () => {
   const [trackingNumber, setTrackingNumber] = useState('');
   const [orderData, setOrderData] = useState(null);

   const handleTrackOrder = (e) => {
      e.preventDefault();
      // Mock tracking data - in real app this would be an API call
      if (trackingNumber.trim()) {
         setOrderData({
            orderNumber: trackingNumber,
            status: 'In Transit',
            estimatedDelivery: 'Tomorrow, Sep 24',
            trackingSteps: [
               { title: 'Order Placed', date: 'Sep 20, 2:30 PM', completed: true },
               { title: 'Payment Confirmed', date: 'Sep 20, 2:31 PM', completed: true },
               { title: 'Order Processed', date: 'Sep 21, 9:15 AM', completed: true },
               { title: 'Shipped', date: 'Sep 22, 11:30 AM', completed: true },
               { title: 'Out for Delivery', date: 'Sep 24, 8:00 AM', completed: false },
               { title: 'Delivered', date: 'Pending', completed: false }
            ]
         });
      }
   };

   return (
      <>
         <Meta title="Track Your Order | ShopSphere" description="Track your order status and delivery progress." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Track Your <span className="text-orange-500">Order</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                     Enter your order number to get real-time updates on your delivery.
                  </p>
               </motion.div>

               {/* Tracking Form */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
               >
                  <Card className="p-8">
                     <form onSubmit={handleTrackOrder} className="space-y-6">
                        <div>
                           <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
                              Order Number or Tracking ID
                           </label>
                           <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                 <Search className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                 type="text"
                                 id="tracking"
                                 value={trackingNumber}
                                 onChange={(e) => setTrackingNumber(e.target.value)}
                                 placeholder="Enter your order number (e.g., ORD-12345)"
                                 className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                 required
                              />
                           </div>
                        </div>
                        <Button 
                           type="submit" 
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
                        >
                           Track Order
                        </Button>
                     </form>
                  </Card>
               </motion.div>

               {/* Order Status */}
               {orderData && (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="space-y-8"
                  >
                     {/* Order Summary */}
                     <Card className="p-8 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                        <div className="flex items-center justify-between mb-6">
                           <div>
                              <h2 className="text-2xl font-bold mb-2">Order #{orderData.orderNumber}</h2>
                              <p className="text-green-100">Status: {orderData.status}</p>
                           </div>
                           <Package className="w-12 h-12" />
                        </div>
                        <div className="flex items-center space-x-2 text-green-100">
                           <Calendar className="w-5 h-5" />
                           <span>Estimated Delivery: {orderData.estimatedDelivery}</span>
                        </div>
                     </Card>

                     {/* Tracking Timeline */}
                     <Card className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Order Progress</h3>
                        
                        <div className="space-y-6">
                           {orderData.trackingSteps.map((step, index) => (
                              <div key={index} className="flex items-start space-x-4">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                                 }`}>
                                    {step.completed ? (
                                       <div className="w-3 h-3 bg-white rounded-full" />
                                    ) : (
                                       <div className="w-3 h-3 bg-white/50 rounded-full" />
                                    )}
                                 </div>
                                 <div className="flex-1">
                                    <h4 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                       {step.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">{step.date}</p>
                                 </div>
                                 {index === orderData.trackingSteps.findIndex(s => !s.completed) && (
                                    <Truck className="w-5 h-5 text-orange-500" />
                                 )}
                              </div>
                           ))}
                        </div>
                     </Card>

                     {/* Delivery Info */}
                     <Card className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                           <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                           Delivery Information
                        </h3>
                        <div className="space-y-3 text-gray-600">
                           <p><strong>Shipping Address:</strong> 123 Main St, City, State 12345</p>
                           <p><strong>Carrier:</strong> FedEx Express</p>
                           <p><strong>Service:</strong> Standard Shipping</p>
                           <p><strong>Tracking Number:</strong> {trackingNumber}</p>
                        </div>
                     </Card>
                  </motion.div>
               )}

               {/* Help Section */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mt-16"
               >
                  <Card className="p-8 bg-gray-900 text-white">
                     <h2 className="text-2xl font-bold mb-4">Need Help with Your Order?</h2>
                     <p className="text-gray-300 mb-6">
                        Can't find your order or having tracking issues? Our support team is here to help!
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                           Contact Support
                        </Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                           View FAQ
                        </Button>
                     </div>
                  </Card>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default TrackOrderScreen;