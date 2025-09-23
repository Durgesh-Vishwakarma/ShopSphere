import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Eye, Database, Users } from 'lucide-react';
import { Card } from '../components/ui/Card';
import Meta from '../components/Meta';

const CookiePolicyScreen = () => {
   return (
      <>
         <Meta title="Cookie Policy | ShopSphere" description="Learn about how we use cookies to improve your shopping experience." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Cookie <span className="text-orange-500">Policy</span>
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                     Learn about how we use cookies to enhance your shopping experience.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
               </motion.div>

               {/* Cookie Overview */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
               >
                  <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                     <div className="flex items-center mb-4">
                        <Cookie className="w-8 h-8 mr-3" />
                        <h2 className="text-2xl font-bold">What Are Cookies?</h2>
                     </div>
                     <p className="text-orange-100 leading-relaxed">
                        Cookies are small text files that are stored on your device when you visit our website. 
                        They help us provide you with a better, faster, and more personalized shopping experience.
                     </p>
                  </Card>
               </motion.div>

               {/* Types of Cookies */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
               >
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Types of Cookies We Use</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                     <Card className="p-6">
                        <div className="flex items-center mb-4">
                           <Shield className="w-6 h-6 text-green-500 mr-3" />
                           <h3 className="text-xl font-semibold text-gray-900">Essential Cookies</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                           These cookies are necessary for the website to function properly. They enable core functionality 
                           such as security, network management, and accessibility.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                           <li>• Authentication and login sessions</li>
                           <li>• Shopping cart functionality</li>
                           <li>• Security and fraud prevention</li>
                           <li>• Website performance monitoring</li>
                        </ul>
                     </Card>

                     <Card className="p-6">
                        <div className="flex items-center mb-4">
                           <Eye className="w-6 h-6 text-blue-500 mr-3" />
                           <h3 className="text-xl font-semibold text-gray-900">Analytics Cookies</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                           These cookies help us understand how visitors interact with our website by collecting 
                           and reporting information anonymously.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                           <li>• Page views and user behavior</li>
                           <li>• Popular products and categories</li>
                           <li>• Website performance metrics</li>
                           <li>• Error tracking and debugging</li>
                        </ul>
                     </Card>

                     <Card className="p-6">
                        <div className="flex items-center mb-4">
                           <Users className="w-6 h-6 text-purple-500 mr-3" />
                           <h3 className="text-xl font-semibold text-gray-900">Personalization Cookies</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                           These cookies enable us to provide personalized content and recommendations 
                           based on your preferences and shopping history.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                           <li>• Product recommendations</li>
                           <li>• Customized user experience</li>
                           <li>• Recently viewed items</li>
                           <li>• Preferred language and currency</li>
                        </ul>
                     </Card>

                     <Card className="p-6">
                        <div className="flex items-center mb-4">
                           <Database className="w-6 h-6 text-orange-500 mr-3" />
                           <h3 className="text-xl font-semibold text-gray-900">Marketing Cookies</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                           These cookies are used to deliver advertisements that are relevant to you and your interests. 
                           They also help measure the effectiveness of advertising campaigns.
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1">
                           <li>• Targeted advertising</li>
                           <li>• Social media integration</li>
                           <li>• Promotional campaigns</li>
                           <li>• Third-party advertising networks</li>
                        </ul>
                     </Card>
                  </div>
               </motion.div>

               {/* Cookie Management */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-12"
               >
                  <Card className="p-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Settings className="w-6 h-6 mr-3 text-orange-500" />
                        Managing Your Cookie Preferences
                     </h2>
                     
                     <div className="space-y-4 text-gray-600">
                        <p>
                           You have several options to manage or disable cookies:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                           <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Browser Settings</h3>
                              <p className="text-sm">
                                 Most web browsers allow you to control cookies through their settings. 
                                 You can set your browser to refuse cookies or delete existing ones.
                              </p>
                           </div>
                           
                           <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Cookie Preferences</h3>
                              <p className="text-sm">
                                 Use our cookie preference center to customize which types of cookies 
                                 you want to allow on our website.
                              </p>
                           </div>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                           <p className="text-yellow-800 text-sm">
                              <strong>Please note:</strong> Disabling certain cookies may affect the functionality 
                              of our website and limit your ability to use some features.
                           </p>
                        </div>
                     </div>
                  </Card>
               </motion.div>

               {/* Third-Party Cookies */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-12"
               >
                  <Card className="p-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>
                     
                     <div className="space-y-4 text-gray-600">
                        <p>
                           We may use third-party services that also set cookies on your device. These include:
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                           <div className="text-center">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                 <Eye className="w-6 h-6 text-blue-600" />
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-2">Google Analytics</h3>
                              <p className="text-sm">Website traffic and user behavior analysis</p>
                           </div>
                           
                           <div className="text-center">
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                 <Users className="w-6 h-6 text-purple-600" />
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-2">Social Media</h3>
                              <p className="text-sm">Social sharing and login functionality</p>
                           </div>
                           
                           <div className="text-center">
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                 <Database className="w-6 h-6 text-green-600" />
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-2">Payment Processors</h3>
                              <p className="text-sm">Secure payment processing and fraud prevention</p>
                           </div>
                        </div>
                     </div>
                  </Card>
               </motion.div>

               {/* Contact Section */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="text-center"
               >
                  <Card className="p-8 bg-gray-900 text-white">
                     <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
                     <p className="text-gray-300 mb-6">
                        If you have any questions about our use of cookies, please don't hesitate to contact us.
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

export default CookiePolicyScreen;