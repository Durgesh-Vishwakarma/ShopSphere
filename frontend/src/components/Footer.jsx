import { Github, Instagram, Mail, MapPin, Phone, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="border-t border-gray-200 bg-white text-gray-700">
         <div className="container">
            <div className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-4">
               <div>
                  <div className="mb-4 flex items-center gap-2">
                     <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-white">
                        <Store className="h-5 w-5" />
                     </span>
                     <span className="text-lg font-semibold text-gray-950">ShopSphere</span>
                  </div>
                  <p className="text-sm leading-6 text-gray-600">
                     A straightforward e-commerce store for browsing products, managing orders, and checking out with PayPal.
                  </p>
                  <div className="mt-4 flex gap-2">
                     {[Instagram, Github].map((Icon, index) => (
                        <a
                           key={index}
                           href="#"
                           className="rounded-md border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                           aria-label="Social link"
                        >
                           <Icon className="h-4 w-4" />
                        </a>
                     ))}
                  </div>
               </div>

               <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-950">Shop</h3>
                  <ul className="space-y-2 text-sm">
                     <li><Link to="/" className="hover:text-primary">Home</Link></li>
                     <li><Link to="/products" className="hover:text-primary">Products</Link></li>
                     <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
                     <li><Link to="/wishlist" className="hover:text-primary">Wishlist</Link></li>
                  </ul>
               </div>

               <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-950">Support</h3>
                  <ul className="space-y-2 text-sm">
                     <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
                     <li><Link to="/shipping-info" className="hover:text-primary">Shipping Info</Link></li>
                     <li><Link to="/returns" className="hover:text-primary">Returns</Link></li>
                     <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
                  </ul>
               </div>

               <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-950">Contact</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                     <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> 123 Commerce St, Tech City</p>
                     <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> +1 (555) 123-4567</p>
                     <p className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> support@shopsphere.com</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-200 py-5 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
               <p>© {currentYear} ShopSphere. All rights reserved.</p>
               <div className="flex flex-wrap gap-4">
                  <Link to="/privacy" className="hover:text-primary">Privacy</Link>
                  <Link to="/terms" className="hover:text-primary">Terms</Link>
                  <Link to="/cookies" className="hover:text-primary">Cookies</Link>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
