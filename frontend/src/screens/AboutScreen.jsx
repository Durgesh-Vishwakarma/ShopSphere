import { motion } from 'framer-motion';
import { Store, Users, Award, Truck, Shield, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import Meta from '../components/Meta';

const AboutScreen = () => {
   return (
      <>
         <Meta title="About Us | ShopSphere" description="Learn about ShopSphere's mission, values, and commitment to quality products and exceptional service." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Hero Section */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     About <span className="text-orange-500">ShopSphere</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                     Your premier destination for quality products and exceptional shopping experiences. 
                     Discover, shop, and enjoy with confidence.
                  </p>
               </motion.div>

               {/* Mission Statement */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-16"
               >
                  <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-50 to-purple-50">
                     <div className="text-center">
                        <Store className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                           At ShopSphere, we believe that shopping should be an experience that brings joy, convenience, 
                           and value to your life. We're committed to curating the finest products from trusted brands 
                           and emerging innovators, ensuring that every purchase meets our high standards of quality 
                           and customer satisfaction.
                        </p>
                     </div>
                  </Card>
               </motion.div>

               {/* Values Grid */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-16"
               >
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose ShopSphere?</h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {[
                        {
                           icon: Award,
                           title: "Premium Quality",
                           description: "Every product is carefully selected and tested to ensure it meets our rigorous quality standards."
                        },
                        {
                           icon: Truck,
                           title: "Fast Delivery",
                           description: "Free shipping on orders over $50 with express delivery options available nationwide."
                        },
                        {
                           icon: Shield,
                           title: "Secure Shopping",
                           description: "Your data is protected with enterprise-grade security and encrypted payment processing."
                        },
                        {
                           icon: Users,
                           title: "Customer First",
                           description: "Our dedicated support team is here to help you 24/7 with any questions or concerns."
                        },
                        {
                           icon: Clock,
                           title: "Easy Returns",
                           description: "30-day hassle-free returns on all products. Your satisfaction is our priority."
                        },
                        {
                           icon: Store,
                           title: "Trusted Platform",
                           description: "Join thousands of satisfied customers who trust ShopSphere for their shopping needs."
                        }
                     ].map((feature, index) => (
                        <motion.div
                           key={feature.title}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * index }}
                        >
                           <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                              <feature.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                           </Card>
                        </motion.div>
                     ))}
                  </div>
               </motion.div>

               {/* Company Story */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-16"
               >
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                           <p>
                              Founded in 2020, ShopSphere began as a vision to revolutionize online shopping by 
                              creating a platform that prioritizes quality, customer experience, and innovation.
                           </p>
                           <p>
                              What started as a small team of passionate entrepreneurs has grown into a trusted 
                              marketplace serving customers worldwide. We've built our reputation on three core 
                              principles: quality products, exceptional service, and continuous innovation.
                           </p>
                           <p>
                              Today, ShopSphere partners with over 1,000 brands and serves millions of customers 
                              globally, but we've never forgotten our commitment to treating every customer like family.
                           </p>
                        </div>
                     </div>
                     
                     <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50">
                        <div className="text-center">
                           <h3 className="text-2xl font-bold text-gray-900 mb-6">By the Numbers</h3>
                           <div className="grid grid-cols-2 gap-6">
                              <div>
                                 <div className="text-3xl font-bold text-orange-500">1M+</div>
                                 <div className="text-gray-600">Happy Customers</div>
                              </div>
                              <div>
                                 <div className="text-3xl font-bold text-orange-500">50K+</div>
                                 <div className="text-gray-600">Products</div>
                              </div>
                              <div>
                                 <div className="text-3xl font-bold text-orange-500">1K+</div>
                                 <div className="text-gray-600">Brand Partners</div>
                              </div>
                              <div>
                                 <div className="text-3xl font-bold text-orange-500">99.9%</div>
                                 <div className="text-gray-600">Uptime</div>
                              </div>
                           </div>
                        </div>
                     </Card>
                  </div>
               </motion.div>

               {/* Call to Action */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
               >
                  <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                     <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
                     <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Join millions of satisfied customers and discover what makes ShopSphere special.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                           Browse Products
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                           Contact Us
                        </button>
                     </div>
                  </Card>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default AboutScreen;