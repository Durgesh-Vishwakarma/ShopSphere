import { motion } from 'framer-motion';
import { RotateCcw, Truck, CheckCircle, XCircle, Package, Calendar, Globe, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Meta from '../components/Meta';

const ReturnsScreen = () => {
   return (
      <>
         <Meta title="Returns & Exchanges | ShopSphere" description="Easy returns and exchanges with our hassle-free policy." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Returns & <span className="text-orange-500">Exchanges</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Shop with confidence. Our hassle-free return policy ensures your satisfaction.
                  </p>
               </motion.div>

               {/* Return Policy Overview */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-16"
               >
                  <Card className="p-8 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center">
                     <RotateCcw className="w-16 h-16 mx-auto mb-4" />
                     <h2 className="text-3xl font-bold mb-4">30-Day Return Policy</h2>
                     <p className="text-lg text-green-100 max-w-2xl mx-auto">
                        Return any item within 30 days of delivery for a full refund or exchange. 
                        No questions asked, no restocking fees.
                     </p>
                  </Card>
               </motion.div>

               {/* Return Process */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-16"
               >
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How to Return an Item</h2>
                  
                  <div className="grid md:grid-cols-4 gap-8">
                     {[
                        {
                           step: "1",
                           icon: Package,
                           title: "Start Return",
                           description: "Log into your account and select the item you want to return from your orders."
                        },
                        {
                           step: "2",
                           icon: CheckCircle,
                           title: "Print Label",
                           description: "We'll email you a prepaid return shipping label - no cost to you."
                        },
                        {
                           step: "3",
                           icon: Truck,
                           title: "Ship It Back",
                           description: "Package the item securely and drop it off at any carrier location."
                        },
                        {
                           step: "4",
                           icon: RotateCcw,
                           title: "Get Refund",
                           description: "Once we receive your return, we'll process your refund within 3-5 business days."
                        }
                     ].map((step, index) => (
                        <motion.div
                           key={step.step}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * index }}
                           className="text-center"
                        >
                           <div className="relative mb-6">
                              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                 <step.icon className="w-8 h-8 text-white" />
                              </div>
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                 {step.step}
                              </div>
                           </div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                           <p className="text-gray-600 text-sm">{step.description}</p>
                        </motion.div>
                     ))}
                  </div>
               </motion.div>

               {/* Return Eligibility */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid lg:grid-cols-2 gap-12 mb-16"
               >
                  <Card className="p-8">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                        Returnable Items
                     </h3>
                     <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                           <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                           Items in original condition with tags attached
                        </li>
                        <li className="flex items-start">
                           <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                           Unopened electronics in original packaging
                        </li>
                        <li className="flex items-start">
                           <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                           Books, media, and home goods (unused)
                        </li>
                        <li className="flex items-start">
                           <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                           Clothing and accessories (unworn, tags on)
                        </li>
                        <li className="flex items-start">
                           <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                           Items returned within 30 days of delivery
                        </li>
                     </ul>
                  </Card>

                  <Card className="p-8">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <XCircle className="w-6 h-6 mr-3 text-red-500" />
                        Non-Returnable Items
                     </h3>
                     <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                           <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                           Personalized or customized items
                        </li>
                        <li className="flex items-start">
                           <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                           Perishable goods (food, flowers)
                        </li>
                        <li className="flex items-start">
                           <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                           Intimate or sanitary items
                        </li>
                        <li className="flex items-start">
                           <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                           Gift cards and digital downloads
                        </li>
                        <li className="flex items-start">
                           <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                           Items damaged by normal wear and tear
                        </li>
                     </ul>
                  </Card>
               </motion.div>

               {/* Refund Information */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-16"
               >
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Refund Information</h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                     <Card className="p-6 text-center">
                        <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Original Payment Method</h3>
                        <p className="text-gray-600 text-sm">
                           Refunds are processed back to your original payment method within 3-5 business days.
                        </p>
                     </Card>

                     <Card className="p-6 text-center">
                        <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Time</h3>
                        <p className="text-gray-600 text-sm">
                           Most refunds appear in your account within 3-5 business days, depending on your bank.
                        </p>
                     </Card>

                     <Card className="p-6 text-center">
                        <Truck className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Return Shipping</h3>
                        <p className="text-gray-600 text-sm">
                           We provide prepaid return labels for all eligible returns - completely free for you.
                        </p>
                     </Card>
                  </div>
               </motion.div>

               {/* International Returns */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mb-16"
               >
                  <Card className="p-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Globe className="w-6 h-6 mr-3 text-orange-500" />
                        International Returns
                     </h2>
                     <div className="grid md:grid-cols-2 gap-8">
                        <div>
                           <h3 className="font-semibold text-gray-900 mb-3">Return Process</h3>
                           <p className="text-gray-600 mb-4">
                              International customers can return items within 30 days. You'll receive a return 
                              authorization number and detailed instructions.
                           </p>
                           <h3 className="font-semibold text-gray-900 mb-3">Shipping Costs</h3>
                           <p className="text-gray-600">
                              Return shipping costs vary by location. We'll provide the most economical options 
                              and may offer partial reimbursement for defective items.
                           </p>
                        </div>
                        <div>
                           <h3 className="font-semibold text-gray-900 mb-3">Customs & Duties</h3>
                           <p className="text-gray-600 mb-4">
                              Any customs duties or taxes paid on the original shipment are non-refundable. 
                              Return shipments may also be subject to local fees.
                           </p>
                           <h3 className="font-semibold text-gray-900 mb-3">Processing Time</h3>
                           <p className="text-gray-600">
                              International returns may take 7-14 business days to process once received, 
                              depending on customs clearance.
                           </p>
                        </div>
                     </div>
                  </Card>
               </motion.div>

               {/* Contact for Returns */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-center"
               >
                  <Card className="p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                     <h2 className="text-2xl font-bold mb-4">Need to Start a Return?</h2>
                     <p className="mb-6 text-blue-100">
                        Our returns team is ready to help you with any return or exchange questions.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-white text-blue-500 hover:bg-gray-100">
                           Start Return Online
                        </Button>
                        <Button 
                           variant="outline" 
                           className="border-white text-white hover:bg-white hover:text-blue-500"
                        >
                           Contact Returns Team
                        </Button>
                     </div>
                  </Card>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default ReturnsScreen;