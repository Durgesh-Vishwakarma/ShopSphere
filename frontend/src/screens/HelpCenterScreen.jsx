import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, MessageCircle, Book, Phone, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Meta from '../components/Meta';

const HelpCenterScreen = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('all');

   const categories = [
      { id: 'all', name: 'All Topics', icon: Book },
      { id: 'orders', name: 'Orders & Shipping', icon: MessageCircle },
      { id: 'returns', name: 'Returns & Refunds', icon: HelpCircle },
      { id: 'account', name: 'Account & Profile', icon: MessageCircle },
      { id: 'payments', name: 'Payments & Billing', icon: HelpCircle },
   ];

   const helpTopics = [
      {
         category: 'orders',
         question: 'How can I track my order?',
         answer: 'You can track your order by visiting the "Track Order" page or checking your email for tracking information. You\'ll receive a tracking number once your order ships.'
      },
      {
         category: 'orders',
         question: 'How long does shipping take?',
         answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 days) and overnight shipping are also available at checkout.'
      },
      {
         category: 'returns',
         question: 'What is your return policy?',
         answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some restrictions apply to electronics and personal care items.'
      },
      {
         category: 'returns',
         question: 'How do I return an item?',
         answer: 'To return an item, visit your account\'s order history, select the item you want to return, and follow the return instructions. You can print a prepaid return label.'
      },
      {
         category: 'account',
         question: 'How do I reset my password?',
         answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you instructions to reset your password.'
      },
      {
         category: 'account',
         question: 'How do I update my account information?',
         answer: 'Sign in to your account and visit the "Profile" section where you can update your personal information, shipping addresses, and preferences.'
      },
      {
         category: 'payments',
         question: 'What payment methods do you accept?',
         answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Buy Now, Pay Later options.'
      },
      {
         category: 'payments',
         question: 'Is my payment information secure?',
         answer: 'Yes! We use industry-standard SSL encryption and never store your complete credit card information. All payments are processed securely through trusted payment processors.'
      }
   ];

   const filteredTopics = helpTopics.filter(topic => 
      (selectedCategory === 'all' || topic.category === selectedCategory) &&
      (searchQuery === '' || 
       topic.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
       topic.answer.toLowerCase().includes(searchQuery.toLowerCase()))
   );

   return (
      <>
         <Meta title="Help Center | ShopSphere" description="Find answers to common questions and get help with your ShopSphere shopping experience." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Help <span className="text-orange-500">Center</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Find answers to common questions or get in touch with our support team.
                  </p>
               </motion.div>

               {/* Search Bar */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl mx-auto mb-12"
               >
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                     <input
                        type="text"
                        placeholder="Search for help topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                     />
                  </div>
               </motion.div>

               {/* Category Filters */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap justify-center gap-4 mb-12"
               >
                  {categories.map((category) => (
                     <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                           selectedCategory === category.id
                              ? 'bg-orange-500 text-white'
                              : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                     >
                        <category.icon className="w-5 h-5" />
                        <span>{category.name}</span>
                     </button>
                  ))}
               </motion.div>

               {/* FAQ Section */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-4xl mx-auto mb-16"
               >
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                     Frequently Asked Questions
                  </h2>
                  
                  <div className="space-y-4">
                     {filteredTopics.map((topic, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * index }}
                        >
                           <Card className="p-6 hover:shadow-lg transition-shadow">
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                 {topic.question}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                 {topic.answer}
                              </p>
                           </Card>
                        </motion.div>
                     ))}
                  </div>

                  {filteredTopics.length === 0 && (
                     <Card className="p-8 text-center">
                        <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-600">
                           Try adjusting your search terms or browse different categories.
                        </p>
                     </Card>
                  )}
               </motion.div>

               {/* Contact Support */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
               >
                  <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                     <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
                     <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Can't find what you're looking for? Our friendly support team is ready to assist you.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
                           <MessageCircle className="w-5 h-5" />
                           <span>Live Chat</span>
                        </Button>
                        <Button 
                           variant="outline" 
                           className="border-white text-white hover:bg-white hover:text-gray-900 flex items-center space-x-2"
                        >
                           <Phone className="w-5 h-5" />
                           <span>Call Support</span>
                        </Button>
                        <Button 
                           variant="outline" 
                           className="border-white text-white hover:bg-white hover:text-gray-900 flex items-center space-x-2"
                        >
                           <Mail className="w-5 h-5" />
                           <span>Email Us</span>
                        </Button>
                     </div>
                  </Card>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default HelpCenterScreen;