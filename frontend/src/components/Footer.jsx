import { Store, Facebook, Twitter, Instagram, Github, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="bg-gray-900 text-white">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
            <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Brand Section */}
               <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Store className="h-8 w-8 text-blue-500" />
                     <span className="text-2xl font-bold">ShopSphere</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                     Your premier destination for quality products and exceptional shopping experiences. 
                     Discover, shop, and enjoy with confidence.
                  </p>
                  <div className="flex space-x-4">
                     <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Facebook className="h-5 w-5" />
                     </a>
                     <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Twitter className="h-5 w-5" />
                     </a>
                     <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Instagram className="h-5 w-5" />
                     </a>
                     <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Github className="h-5 w-5" />
                     </a>
                  </div>
               </div>

               {/* Quick Links */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Quick Links</h3>
                  <ul className="space-y-2">
                     <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                     <li><a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                     <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                     <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                     <li><a href="/cart" className="text-gray-400 hover:text-white transition-colors">Shopping Cart</a></li>
                  </ul>
               </div>

               {/* Customer Service */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Customer Service</h3>
                  <ul className="space-y-2">
                     <li><a href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                     <li><a href="/shipping-info" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                     <li><a href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                     <li><a href="/track" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
                     <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                  </ul>
               </div>

               {/* Contact Info */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Info</h3>
                  <div className="space-y-3">
                     <div className="flex items-center space-x-3 text-gray-400">
                        <MapPin className="h-5 w-5" />
                        <span>123 Commerce St, City, State 12345</span>
                     </div>
                     <div className="flex items-center space-x-3 text-gray-400">
                        <Phone className="h-5 w-5" />
                        <span>+1 (555) 123-4567</span>
                     </div>
                     <div className="flex items-center space-x-3 text-gray-400">
                        <Mail className="h-5 w-5" />
                        <span>support@shopsphere.com</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6">
               <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-gray-400 text-sm">
                     © {currentYear} ShopSphere. All rights reserved.
                  </div>
                  <div className="flex space-x-6 text-sm">
                     <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                        Privacy Policy
                     </a>
                     <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                        Terms of Service
                     </a>
                     <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                        Cookie Policy
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;