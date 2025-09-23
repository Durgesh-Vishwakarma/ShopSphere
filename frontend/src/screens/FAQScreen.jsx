import { motion } from 'framer-motion';
import { useState } from 'react';
import { HelpCircle, ChevronDown, Search, ShoppingCart, User, Truck, RotateCcw } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Meta from '../components/Meta';

const FAQScreen = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [expandedFAQ, setExpandedFAQ] = useState(null);

   const faqCategories = [
      {
         title: "Shopping & Orders",
         icon: ShoppingCart,
         color: "text-blue-500",
         faqs: [
            {
               id: 1,
               question: "How do I place an order?",
               answer: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your purchase. Follow the checkout steps to enter shipping and payment information."
            },
            {
               id: 2,
               question: "Can I modify or cancel my order?",
               answer: "You can modify or cancel your order within 30 minutes of placing it, as long as it hasn't been processed for shipping. Contact our customer service team immediately for assistance."
            },
            {
               id: 3,
               question: "What payment methods do you accept?",
               answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay for your convenience."
            },
            {
               id: 4,
               question: "How do I use a discount code?",
               answer: "Enter your discount code in the 'Promo Code' field during checkout. The discount will be applied automatically before you complete your purchase. Codes are case-sensitive."
            }
         ]
      },
      {
         title: "Shipping & Delivery",
         icon: Truck,
         color: "text-orange-500",
         faqs: [
            {
               id: 5,
               question: "How long does shipping take?",
               answer: "Standard shipping takes 3-5 business days, Express shipping takes 1-2 business days, and Overnight shipping delivers the next business day. International shipping varies by location."
            },
            {
               id: 6,
               question: "How can I track my order?",
               answer: "Once your order ships, you'll receive a tracking number via email. You can also check your order status by logging into your account and viewing your order history."
            },
            {
               id: 7,
               question: "What if my package is lost or damaged?",
               answer: "If your package is lost or arrives damaged, contact us immediately. We'll investigate with the carrier and either resend your order or provide a full refund."
            },
            {
               id: 8,
               question: "Do you ship internationally?",
               answer: "Yes, we ship to over 180 countries worldwide. International shipping costs and delivery times vary by location. Customs duties and taxes may apply."
            }
         ]
      },
      {
         title: "Returns & Exchanges",
         icon: RotateCcw,
         color: "text-green-500",
         faqs: [
            {
               id: 9,
               question: "What is your return policy?",
               answer: "We offer a 30-day return policy on most items. Items must be in original condition with tags attached. We provide prepaid return labels for your convenience."
            },
            {
               id: 10,
               question: "How do I return an item?",
               answer: "Log into your account, go to your order history, and select 'Return Item'. We'll email you a prepaid return label. Package the item securely and drop it off at any carrier location."
            },
            {
               id: 11,
               question: "How long do refunds take?",
               answer: "Once we receive your return, refunds are processed within 3-5 business days. The money will appear in your account depending on your bank's processing time."
            },
            {
               id: 12,
               question: "Can I exchange an item for a different size or color?",
               answer: "Yes! During the return process, you can select 'Exchange' and choose a different size or color. We'll send the new item once we receive your return."
            }
         ]
      },
      {
         title: "Account & Security",
         icon: User,
         color: "text-purple-500",
         faqs: [
            {
               id: 13,
               question: "How do I create an account?",
               answer: "Click 'Sign Up' in the top right corner, enter your email and choose a password. You can also sign up during checkout. Having an account lets you track orders and save favorites."
            },
            {
               id: 14,
               question: "I forgot my password. What should I do?",
               answer: "Click 'Forgot Password' on the login page and enter your email. We'll send you a secure link to reset your password. The link expires after 24 hours for security."
            },
            {
               id: 15,
               question: "Is my personal information secure?",
               answer: "Yes, we use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your consent."
            },
            {
               id: 16,
               question: "How do I update my account information?",
               answer: "Log into your account and go to 'Profile Settings'. You can update your name, email, password, and default shipping address from there."
            }
         ]
      }
   ];

   const allFAQs = faqCategories.flatMap(category => 
      category.faqs.map(faq => ({ ...faq, category: category.title }))
   );

   const filteredFAQs = searchTerm 
      ? allFAQs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allFAQs;

   const toggleFAQ = (id) => {
      setExpandedFAQ(expandedFAQ === id ? null : id);
   };

   return (
      <>
         <Meta title="FAQ - Frequently Asked Questions | ShopSphere" description="Find answers to common questions about shopping, shipping, returns, and more." />
         
         <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                     Frequently Asked <span className="text-orange-500">Questions</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                     Find quick answers to common questions about shopping, shipping, and returns.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-md mx-auto relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                     </div>
                     <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                     />
                  </div>
               </motion.div>

               {/* FAQ Categories */}
               {!searchTerm && (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                  >
                     {faqCategories.map((category, index) => (
                        <motion.div
                           key={category.title}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * index }}
                        >
                           <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                              <category.icon className={`w-12 h-12 ${category.color} mx-auto mb-4`} />
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                              <p className="text-gray-600 text-sm">{category.faqs.length} questions</p>
                           </Card>
                        </motion.div>
                     ))}
                  </motion.div>
               )}

               {/* FAQ List */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
               >
                  {searchTerm && (
                     <div className="mb-6">
                        <p className="text-gray-600">
                           {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchTerm}"
                        </p>
                     </div>
                  )}

                  {(searchTerm ? filteredFAQs : allFAQs).map((faq, index) => (
                     <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                     >
                        <Card className="overflow-hidden">
                           <button
                              onClick={() => toggleFAQ(faq.id)}
                              className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                           >
                              <div className="flex items-center justify-between">
                                 <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                       {faq.question}
                                    </h3>
                                    {searchTerm && (
                                       <p className="text-sm text-gray-500">{faq.category}</p>
                                    )}
                                 </div>
                                 <ChevronDown 
                                    className={`w-5 h-5 text-gray-400 transition-transform ${
                                       expandedFAQ === faq.id ? 'transform rotate-180' : ''
                                    }`}
                                 />
                              </div>
                           </button>
                           
                           {expandedFAQ === faq.id && (
                              <motion.div
                                 initial={{ opacity: 0, height: 0 }}
                                 animate={{ opacity: 1, height: 'auto' }}
                                 exit={{ opacity: 0, height: 0 }}
                                 className="px-6 pb-6"
                              >
                                 <div className="pt-4 border-t border-gray-200">
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                 </div>
                              </motion.div>
                           )}
                        </Card>
                     </motion.div>
                  ))}
               </motion.div>

               {/* Contact Section */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-16"
               >
                  <Card className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                     <HelpCircle className="w-16 h-16 mx-auto mb-4" />
                     <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
                     <p className="mb-6 text-purple-100">
                        Can't find what you're looking for? Our support team is here to help!
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-white text-purple-500 hover:bg-gray-100">
                           Contact Support
                        </Button>
                        <Button 
                           variant="outline" 
                           className="border-white text-white hover:bg-white hover:text-purple-500"
                        >
                           Live Chat
                        </Button>
                     </div>
                  </Card>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default FAQScreen;