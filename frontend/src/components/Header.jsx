import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import SearchBox from './SearchBox';
import { 
   ShoppingCart, 
   User, 
   Menu, 
   X, 
   Settings, 
   LogOut, 
   Package, 
   Users, 
   ShoppingBag,
   Store,
   Heart
} from 'lucide-react';

const Header = () => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const { cartItems } = useSelector(state => state.cart);
   const { wishlistItems } = useSelector(state => state.wishlist);
   const { userInfo } = useSelector(state => state.auth);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
      try {
         await logoutApiCall().unwrap();
         dispatch(logout());
         dispatch(resetCart());
         navigate('/auth');
      } catch (err) {
         // Handle logout error silently or with toast
      }
   };

   const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
   const totalWishlistItems = wishlistItems.length;

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
               <Store className="h-8 w-8 text-primary" />
               <span className="text-xl font-bold text-gradient">ShopSphere</span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
               <SearchBox />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
               {/* Wishlist - Only show when logged in */}
               {userInfo && (
                  <Link to="/wishlist" className="relative">
                     <Button variant="ghost" size="icon" className="relative p-3" title="Wishlist">
                        <Heart className="h-7 w-7" />
                        {totalWishlistItems > 0 && (
                           <Badge 
                              variant="destructive" 
                              className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold"
                           >
                              {totalWishlistItems}
                           </Badge>
                        )}
                     </Button>
                  </Link>
               )}

               {/* Cart */}
               <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="relative p-3" title="Shopping Cart">
                     <ShoppingCart className="h-7 w-7" />
                     {totalCartItems > 0 && (
                        <Badge 
                           variant="destructive" 
                           className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold"
                        >
                           {totalCartItems}
                        </Badge>
                     )}
                  </Button>
               </Link>

               {/* User Menu */}
               {userInfo ? (
                  <div className="relative group">
                     <Button variant="ghost" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{userInfo.name}</span>
                     </Button>
                     
                     {/* Dropdown Menu */}
                     <div className="absolute right-0 mt-2 w-48 bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-1">
                           <Link 
                              to="/profile" 
                              className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                           >
                              <Settings className="h-4 w-4 mr-2" />
                              Profile
                           </Link>
                           <button 
                              onClick={logoutHandler}
                              className="flex items-center w-full px-4 py-2 text-sm hover:bg-accent text-left"
                           >
                              <LogOut className="h-4 w-4 mr-2" />
                              Logout
                           </button>
                        </div>
                     </div>
                  </div>
               ) : (
                  <Link to="/auth">
                     <Button variant="outline">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                     </Button>
                  </Link>
               )}

               {/* Admin Menu */}
               {userInfo?.isAdmin && (
                  <div className="relative group">
                     <Button variant="ghost">Admin</Button>
                     
                     <div className="absolute right-0 mt-2 w-48 bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-1">
                           <Link 
                              to="/admin/productlist" 
                              className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                           >
                              <Package className="h-4 w-4 mr-2" />
                              Products
                           </Link>
                           <Link 
                              to="/admin/userlist" 
                              className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                           >
                              <Users className="h-4 w-4 mr-2" />
                              Users
                           </Link>
                           <Link 
                              to="/admin/orderlist" 
                              className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                           >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Orders
                           </Link>
                        </div>
                     </div>
                  </div>
               )}
            </nav>

            {/* Mobile Menu Button */}
            <Button 
               variant="ghost" 
               size="icon" 
               className="md:hidden"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
         </div>

         {/* Mobile Menu */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden border-t bg-background"
               >
                  <div className="container py-4 space-y-4">
                     {/* Mobile Search */}
                     <SearchBox />
                     
                     {/* Mobile Navigation Links */}
                     <div className="space-y-2">
                        {/* Wishlist - Only show when logged in */}
                        {userInfo && (
                           <Link 
                              to="/wishlist" 
                              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-accent"
                              onClick={() => setIsMobileMenuOpen(false)}
                           >
                              <div className="flex items-center">
                                 <Heart className="h-5 w-5 mr-2" />
                                 Wishlist
                              </div>
                              {totalWishlistItems > 0 && (
                                 <Badge variant="destructive">{totalWishlistItems}</Badge>
                              )}
                           </Link>
                        )}
                        
                        <Link 
                           to="/cart" 
                           className="flex items-center justify-between w-full p-2 rounded-md hover:bg-accent"
                           onClick={() => setIsMobileMenuOpen(false)}
                        >
                           <div className="flex items-center">
                              <ShoppingCart className="h-5 w-5 mr-2" />
                              Cart
                           </div>
                           {totalCartItems > 0 && (
                              <Badge variant="destructive">{totalCartItems}</Badge>
                           )}
                        </Link>

                        {userInfo ? (
                           <>
                              <Link 
                                 to="/profile" 
                                 className="flex items-center w-full p-2 rounded-md hover:bg-accent"
                                 onClick={() => setIsMobileMenuOpen(false)}
                              >
                                 <Settings className="h-5 w-5 mr-2" />
                                 Profile
                              </Link>
                              <button 
                                 onClick={() => {
                                    logoutHandler();
                                    setIsMobileMenuOpen(false);
                                 }}
                                 className="flex items-center w-full p-2 rounded-md hover:bg-accent text-left"
                              >
                                 <LogOut className="h-5 w-5 mr-2" />
                                 Logout
                              </button>
                           </>
                        ) : (
                           <Link 
                              to="/auth" 
                              className="flex items-center w-full p-2 rounded-md hover:bg-accent"
                              onClick={() => setIsMobileMenuOpen(false)}
                           >
                              <User className="h-5 w-5 mr-2" />
                              Sign In
                           </Link>
                        )}

                        {userInfo?.isAdmin && (
                           <div className="pt-2 border-t">
                              <p className="text-sm text-muted-foreground mb-2">Admin</p>
                              <Link 
                                 to="/admin/productlist" 
                                 className="flex items-center w-full p-2 rounded-md hover:bg-accent"
                                 onClick={() => setIsMobileMenuOpen(false)}
                              >
                                 <Package className="h-5 w-5 mr-2" />
                                 Products
                              </Link>
                              <Link 
                                 to="/admin/userlist" 
                                 className="flex items-center w-full p-2 rounded-md hover:bg-accent"
                                 onClick={() => setIsMobileMenuOpen(false)}
                              >
                                 <Users className="h-5 w-5 mr-2" />
                                 Users
                              </Link>
                              <Link 
                                 to="/admin/orderlist" 
                                 className="flex items-center w-full p-2 rounded-md hover:bg-accent"
                                 onClick={() => setIsMobileMenuOpen(false)}
                              >
                                 <ShoppingBag className="h-5 w-5 mr-2" />
                                 Orders
                              </Link>
                           </div>
                        )}
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </header>
   );
};

export default Header;