import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Meta from '../components/Meta';

const ContactScreen = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically send the form data to your backend
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
   };

   return (
      <>
         <Meta title="Contact Us | ShopSphere" description="Get in touch with ShopSphere. We're here to help with any questions or concerns." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Contact <span className="text-orange-500">Us</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Have a question or need assistance? We're here to help! Reach out to us through any of the channels below.
                  </p>
               </motion.div>

               <div className="grid lg:grid-cols-2 gap-12">
                  {/* Contact Information */}
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                  >
                     <Card className="p-8 h-full">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        
                        <div className="space-y-6">
                           <div className="flex items-start space-x-4">
                              <div className="bg-orange-100 p-3 rounded-full">
                                 <MapPin className="w-6 h-6 text-orange-500" />
                              </div>
                              <div>
                                 <h3 className="font-semibold text-gray-900">Address</h3>
                                 <p className="text-gray-600">
                                    123 Commerce Street<br />
                                    Business District, City<br />
                                    State 12345, USA
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-start space-x-4">
                              <div className="bg-orange-100 p-3 rounded-full">
                                 <Phone className="w-6 h-6 text-orange-500" />
                              </div>
                              <div>
                                 <h3 className="font-semibold text-gray-900">Phone</h3>
                                 <p className="text-gray-600">+1 (555) 123-4567</p>
                                 <p className="text-sm text-gray-500">Toll-free customer support</p>
                              </div>
                           </div>

                           <div className="flex items-start space-x-4">
                              <div className="bg-orange-100 p-3 rounded-full">
                                 <Mail className="w-6 h-6 text-orange-500" />
                              </div>
                              <div>
                                 <h3 className="font-semibold text-gray-900">Email</h3>
                                 <p className="text-gray-600">support@shopsphere.com</p>
                                 <p className="text-sm text-gray-500">We respond within 24 hours</p>
                              </div>
                           </div>

                           <div className="flex items-start space-x-4">
                              <div className="bg-orange-100 p-3 rounded-full">
                                 <Clock className="w-6 h-6 text-orange-500" />
                              </div>
                              <div>
                                 <h3 className="font-semibold text-gray-900">Business Hours</h3>
                                 <div className="text-gray-600 space-y-1">
                                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                                    <p>Sunday: 12:00 PM - 5:00 PM</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="mt-8 pt-8 border-t">
                           <h3 className="font-semibold text-gray-900 mb-4">Emergency Support</h3>
                           <p className="text-gray-600 text-sm">
                              For urgent order issues or technical problems, call our 24/7 emergency line:
                           </p>
                           <p className="text-orange-500 font-semibold">+1 (555) 911-HELP</p>
                        </div>
                     </Card>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 }}
                  >
                     <Card className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                 </label>
                                 <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="John Doe"
                                 />
                              </div>
                              
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                 </label>
                                 <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                 />
                              </div>
                           </div>

                           <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Subject *
                              </label>
                              <input
                                 type="text"
                                 name="subject"
                                 value={formData.subject}
                                 onChange={handleChange}
                                 required
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                 placeholder="How can we help you?"
                              />
                           </div>

                           <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Message *
                              </label>
                              <textarea
                                 name="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 required
                                 rows={6}
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                 placeholder="Tell us more about your question or concern..."
                              />
                           </div>

                           <Button 
                              type="submit"
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 flex items-center justify-center space-x-2"
                           >
                              <Send className="w-5 h-5" />
                              <span>Send Message</span>
                           </Button>
                        </form>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                           <p className="text-sm text-blue-700">
                              <strong>Note:</strong> For order-related inquiries, please include your order number. 
                              We typically respond to all messages within 24 hours during business days.
                           </p>
                        </div>
                     </Card>
                  </motion.div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ContactScreen;