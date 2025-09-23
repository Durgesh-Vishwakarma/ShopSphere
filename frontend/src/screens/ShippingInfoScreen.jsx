import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package, DollarSign, Globe, Phone, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Meta from '../components/Meta';

const ShippingInfoScreen = () => {
   return (
      <>
         <Meta title="Shipping Information | ShopSphere" description="Learn about our shipping options, delivery times, and shipping policies." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Shipping <span className="text-orange-500">Information</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Fast, reliable, and secure shipping options to get your products delivered safely.
                  </p>
               </motion.div>

               {/* Shipping Options */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-16"
               >
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Shipping Options</h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                     {[
                        {
                           icon: Truck,
                           name: "Standard Shipping",
                           time: "3-5 Business Days",
                           cost: "FREE on orders over $50",
                           description: "Our most popular option with reliable tracking and careful handling."
                        },
                        {
                           icon: Clock,
                           name: "Express Shipping",
                           time: "1-2 Business Days",
                           cost: "$9.99",
                           description: "Fast delivery for when you need your items quickly."
                        },
                        {
                           icon: Package,
                           name: "Overnight Shipping",
                           time: "Next Business Day",
                           cost: "$19.99",
                           description: "Order by 2 PM for next-day delivery (Monday-Friday)."
                        }
                     ].map((option, index) => (
                        <motion.div
                           key={option.name}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * index }}
                        >
                           <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                              <option.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.name}</h3>
                              <div className="text-lg font-bold text-orange-500 mb-2">{option.time}</div>
                              <div className="text-sm text-gray-600 font-medium mb-3">{option.cost}</div>
                              <p className="text-gray-600 text-sm">{option.description}</p>
                           </Card>
                        </motion.div>
                     ))}
                  </div>
               </motion.div>

               {/* Shipping Details */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid lg:grid-cols-2 gap-12 mb-16"
               >
                  <Card className="p-8">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Globe className="w-6 h-6 mr-3 text-orange-500" />
                        Shipping Coverage
                     </h3>
                     <div className="space-y-4">
                        <div>
                           <h4 className="font-semibold text-gray-900">Domestic Shipping (USA)</h4>
                           <p className="text-gray-600">We ship to all 50 states including Alaska and Hawaii.</p>
                        </div>
                        <div>
                           <h4 className="font-semibold text-gray-900">International Shipping</h4>
                           <p className="text-gray-600">Available to 180+ countries worldwide. Delivery times vary by location.</p>
                        </div>
                        <div>
                           <h4 className="font-semibold text-gray-900">Special Locations</h4>
                           <p className="text-gray-600">PO Boxes, APO/FPO addresses supported for most items.</p>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-8">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Package className="w-6 h-6 mr-3 text-orange-500" />
                        Packaging & Handling
                     </h3>
                     <div className="space-y-4">
                        <div>
                           <h4 className="font-semibold text-gray-900">Eco-Friendly Packaging</h4>
                           <p className="text-gray-600">We use recyclable materials and minimize packaging waste.</p>
                        </div>
                        <div>
                           <h4 className="font-semibold text-gray-900">Secure Protection</h4>
                           <p className="text-gray-600">Fragile items are carefully padded and marked for special handling.</p>
                        </div>
                        <div>
                           <h4 className="font-semibold text-gray-900">Discreet Shipping</h4>
                           <p className="text-gray-600">All packages are shipped in plain boxes without product details.</p>
                        </div>
                     </div>
                  </Card>
               </motion.div>

               {/* Shipping FAQ */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-16"
               >
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Shipping FAQ</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                     <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                           When will my order ship?
                        </h3>
                        <p className="text-gray-600">
                           Orders placed before 2 PM EST Monday-Friday ship the same day. Weekend orders ship on Monday.
                        </p>
                     </Card>

                     <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                           Can I change my shipping address?
                        </h3>
                        <p className="text-gray-600">
                           Yes, but only before your order ships. Contact us immediately if you need to update your address.
                        </p>
                     </Card>

                     <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                           What if my package is delayed?
                        </h3>
                        <p className="text-gray-600">
                           We'll notify you of any delays and provide updated tracking information. Contact support for assistance.
                        </p>
                     </Card>

                     <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                           Do you ship to PO Boxes?
                        </h3>
                        <p className="text-gray-600">
                           Yes, we ship most items to PO Boxes. Some large items may require a physical address.
                        </p>
                     </Card>
                  </div>
               </motion.div>

               {/* Contact Section */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
               >
                  <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                     <h2 className="text-2xl font-bold mb-4">Need Help with Shipping?</h2>
                     <p className="mb-6 text-orange-100">
                        Our shipping experts are here to help with any questions about delivery options or tracking.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-white text-orange-500 hover:bg-gray-100 flex items-center space-x-2">
                           <Phone className="w-5 h-5" />
                           <span>Call: +1 (555) 123-4567</span>
                        </Button>
                        <Button 
                           variant="outline" 
                           className="border-white text-white hover:bg-white hover:text-orange-500 flex items-center space-x-2"
                        >
                           <Mail className="w-5 h-5" />
                           <span>Email Support</span>
                        </Button>
                     </div>
                  </Card>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default ShippingInfoScreen;