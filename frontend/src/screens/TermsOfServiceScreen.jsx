import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, CheckCircle, Users, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import Meta from '../components/Meta';

const TermsOfServiceScreen = () => {
   return (
      <>
         <Meta title="Terms of Service | ShopSphere" description="Read our terms and conditions for using ShopSphere services." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Terms of <span className="text-orange-500">Service</span>
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                     Please read these terms carefully before using our services.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">Effective Date: December 1, 2024</p>
               </motion.div>

               {/* Agreement Overview */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
               >
                  <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                     <div className="flex items-center mb-4">
                        <Scale className="w-8 h-8 mr-3" />
                        <h2 className="text-2xl font-bold">Agreement to Terms</h2>
                     </div>
                     <p className="text-orange-100 leading-relaxed">
                        By accessing and using ShopSphere, you accept and agree to be bound by the terms 
                        and provision of this agreement. These terms apply to all visitors, users, and 
                        others who access or use the service.
                     </p>
                  </Card>
               </motion.div>

               {/* Terms Sections */}
               <div className="space-y-8">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                  >
                     <Card className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                           <Users className="w-6 h-6 mr-3 text-orange-500" />
                           User Accounts
                        </h2>
                        <div className="prose max-w-none text-gray-600">
                           <p className="mb-4">
                              When you create an account with us, you must provide information that is accurate, 
                              complete, and current at all times. You are responsible for safeguarding the 
                              password and for all activities that occur under your account.
                           </p>
                           <p>
                              You agree not to disclose your password to any third party and to take sole 
                              responsibility for any activities or actions under your account, whether or 
                              not you have authorized such activities or actions.
                           </p>
                        </div>
                     </Card>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.6 }}
                  >
                     <Card className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                           <CheckCircle className="w-6 h-6 mr-3 text-orange-500" />
                           Acceptable Use
                        </h2>
                        <div className="prose max-w-none text-gray-600">
                           <p className="mb-4">You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                           <ul className="space-y-2 ml-4">
                              <li>• Use the service in any way that violates applicable laws or regulations</li>
                              <li>• Transmit or procure sending of any advertising or promotional material</li>
                              <li>• Impersonate or attempt to impersonate the company, employees, or other users</li>
                              <li>• Engage in any other conduct that restricts or inhibits anyone's use of the service</li>
                           </ul>
                        </div>
                     </Card>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.8 }}
                  >
                     <Card className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                           <FileText className="w-6 h-6 mr-3 text-orange-500" />
                           Purchases and Payment
                        </h2>
                        <div className="prose max-w-none text-gray-600">
                           <p className="mb-4">
                              All purchases through our service are subject to product availability. We reserve 
                              the right to refuse or cancel your order at any time for certain reasons including 
                              but not limited to: product availability, errors in product or pricing information, 
                              or problems identified by our credit and fraud avoidance department.
                           </p>
                           <p>
                              We reserve the right to refuse or cancel your order if fraud or an unauthorized 
                              or illegal transaction is suspected.
                           </p>
                        </div>
                     </Card>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.0 }}
                  >
                     <Card className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                           <Shield className="w-6 h-6 mr-3 text-orange-500" />
                           Intellectual Property
                        </h2>
                        <div className="prose max-w-none text-gray-600">
                           <p className="mb-4">
                              The service and its original content, features, and functionality are and will 
                              remain the exclusive property of ShopSphere and its licensors. The service is 
                              protected by copyright, trademark, and other laws.
                           </p>
                           <p>
                              Our trademarks and trade dress may not be used in connection with any product 
                              or service without our prior written consent.
                           </p>
                        </div>
                     </Card>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.2 }}
                  >
                     <Card className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                           <AlertTriangle className="w-6 h-6 mr-3 text-orange-500" />
                           Limitation of Liability
                        </h2>
                        <div className="prose max-w-none text-gray-600">
                           <p className="mb-4">
                              In no event shall ShopSphere, nor its directors, employees, partners, agents, 
                              suppliers, or affiliates, be liable for any indirect, incidental, special, 
                              consequential, or punitive damages, including without limitation, loss of profits, 
                              data, use, goodwill, or other intangible losses.
                           </p>
                           <p>
                              Some jurisdictions do not allow the exclusion of certain warranties or the 
                              exclusion or limitation of liability for consequential or incidental damages, 
                              so the limitations above may not apply to you.
                           </p>
                        </div>
                     </Card>
                  </motion.div>
               </div>

               {/* Contact Section */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="text-center mt-16"
               >
                  <Card className="p-8 bg-gray-900 text-white">
                     <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
                     <p className="text-gray-300 mb-6">
                        If you have any questions about these Terms of Service, please contact us.
                     </p>
                     <p className="text-gray-400">
                        Email: legal@shopsphere.com | Address: 123 Commerce St, Tech City, TC 12345
                     </p>
                  </Card>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default TermsOfServiceScreen;