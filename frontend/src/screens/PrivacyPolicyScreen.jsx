import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import Meta from '../components/Meta';

const PrivacyPolicyScreen = () => {
   return (
      <>
         <Meta title="Privacy Policy | ShopSphere" description="Learn how we protect and handle your personal information." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Privacy <span className="text-orange-500">Policy</span>
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                     Your privacy is important to us. Learn how we collect, use, and protect your information.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
               </motion.div>

               {/* Privacy Overview */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
               >
                  <Card className="p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                     <div className="flex items-center mb-4">
                        <Shield className="w-8 h-8 mr-3" />
                        <h2 className="text-2xl font-bold">Our Commitment to Privacy</h2>
                     </div>
                     <p className="text-blue-100 leading-relaxed">
                        At ShopSphere, we are committed to protecting your privacy and ensuring transparency 
                        about how we handle your personal information. This policy explains what data we collect, 
                        why we collect it, and how we use it to provide you with the best shopping experience.
                     </p>
                  </Card>
               </motion.div>

               {/* Information We Collect */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
               >
                  <Card className="p-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Database className="w-6 h-6 mr-3 text-orange-500" />
                        Information We Collect
                     </h2>
                     
                     <div className="space-y-6">
                        <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                           <ul className="text-gray-600 space-y-2 ml-4">
                              <li>• Name, email address, and phone number</li>
                              <li>• Shipping and billing addresses</li>
                              <li>• Payment information (securely processed by third parties)</li>
                              <li>• Account preferences and communication settings</li>
                           </ul>
                        </div>

                        <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
                           <ul className="text-gray-600 space-y-2 ml-4">
                              <li>• Browsing history and product views</li>
                              <li>• Search queries and purchase history</li>
                              <li>• Device information and IP address</li>
                              <li>• Cookies and similar tracking technologies</li>
                           </ul>
                        </div>
                     </div>
                  </Card>
               </motion.div>

               {/* How We Use Information */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-12"
               >
                  <Card className="p-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Eye className="w-6 h-6 mr-3 text-orange-500" />
                        How We Use Your Information
                     </h2>
                     
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Delivery</h3>
                           <ul className="text-gray-600 space-y-2">
                              <li>• Process and fulfill your orders</li>
                              <li>• Provide customer support</li>
                              <li>• Send order confirmations and updates</li>
                              <li>• Handle returns and exchanges</li>
                           </ul>
                        </div>

                        <div>
                           <h3 className="text-lg font-semibold text-gray-900 mb-3">Personalization</h3>
                           <ul className="text-gray-600 space-y-2">
                              <li>• Recommend products you might like</li>
                              <li>• Customize your shopping experience</li>
                              <li>• Show relevant promotions and offers</li>
                              <li>• Improve our website and services</li>
                           </ul>
                        </div>
                     </div>
                  </Card>
               </motion.div>

               {/* Data Protection */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-12"
               >
                  <Card className="p-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Lock className="w-6 h-6 mr-3 text-orange-500" />
                        How We Protect Your Data
                     </h2>
                     
                     <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                           <Lock className="w-12 h-12 text-green-500 mx-auto mb-4" />
                           <h3 className="font-semibold text-gray-900 mb-2">Encryption</h3>
                           <p className="text-gray-600 text-sm">All data is encrypted in transit and at rest using industry-standard protocols.</p>
                        </div>

                        <div className="text-center">
                           <UserCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                           <h3 className="font-semibold text-gray-900 mb-2">Access Control</h3>
                           <p className="text-gray-600 text-sm">Only authorized personnel have access to your data on a need-to-know basis.</p>
                        </div>

                        <div className="text-center">
                           <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                           <h3 className="font-semibold text-gray-900 mb-2">Monitoring</h3>
                           <p className="text-gray-600 text-sm">We continuously monitor for security threats and vulnerabilities.</p>
                        </div>
                     </div>
                  </Card>
               </motion.div>

               {/* Your Rights */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mb-12"
               >
                  <Card className="p-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
                     
                     <div className="space-y-4">
                        <div className="flex items-start">
                           <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                           <div>
                              <h3 className="font-semibold text-gray-900">Access Your Data</h3>
                              <p className="text-gray-600">Request a copy of the personal information we have about you.</p>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                           <div>
                              <h3 className="font-semibold text-gray-900">Correct Your Data</h3>
                              <p className="text-gray-600">Update or correct any inaccurate personal information.</p>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                           <div>
                              <h3 className="font-semibold text-gray-900">Delete Your Data</h3>
                              <p className="text-gray-600">Request deletion of your personal information (subject to legal requirements).</p>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                           <div>
                              <h3 className="font-semibold text-gray-900">Opt-Out</h3>
                              <p className="text-gray-600">Unsubscribe from marketing communications at any time.</p>
                           </div>
                        </div>
                     </div>
                  </Card>
               </motion.div>

               {/* Contact */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-center"
               >
                  <Card className="p-8 bg-gray-900 text-white">
                     <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
                     <p className="text-gray-300 mb-6">
                        Contact our privacy team if you have any questions about this policy or your data rights.
                     </p>
                     <p className="text-gray-400">
                        Email: privacy@shopsphere.com | Phone: +1 (555) 123-4567
                     </p>
                  </Card>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default PrivacyPolicyScreen;