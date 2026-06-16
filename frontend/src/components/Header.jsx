import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import SearchBox from './SearchBox';
import {
   Heart,
   LogOut,
   Menu,
   Package,
   Settings,
   ShoppingBag,
   ShoppingCart,
   Store,
   User,
   Users,
   X,
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
      } catch {
         // Local logout still clears expired or already-revoked sessions.
      } finally {
         dispatch(logout());
         dispatch(resetCart());
         navigate('/auth');
      }
   };

   const closeMobileMenu = () => setIsMobileMenuOpen(false);
   const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
   const totalWishlistItems = wishlistItems.length;

   return (
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
         <div className="container flex h-20 items-center justify-between gap-5">
            <Link to="/" className="flex items-center gap-2">
               <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                  <Store className="h-5 w-5" />
               </span>
               <span className="text-2xl font-semibold text-gray-950">ShopSphere</span>
            </Link>

            <div className="hidden flex-1 justify-center md:flex">
               <SearchBox />
            </div>

            <nav className="hidden items-center gap-2 md:flex">
               {userInfo && (
                  <Link to="/wishlist">
                     <Button variant="ghost" size="icon" className="relative" title="Wishlist">
                        <Heart className="h-5 w-5" />
                        {totalWishlistItems > 0 && (
                           <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
                              {totalWishlistItems}
                           </span>
                        )}
                     </Button>
                  </Link>
               )}

               <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative" title="Cart">
                     <ShoppingCart className="h-5 w-5" />
                     {totalCartItems > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                           {totalCartItems}
                        </span>
                     )}
                  </Button>
               </Link>

               {userInfo ? (
                  <div className="group relative ml-2">
                     <Button variant="ghost" className="gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-800">
                           {userInfo.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="max-w-28 truncate">{userInfo.name}</span>
                     </Button>

                     <div className="invisible absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
                        <div className="border-b border-gray-100 px-3 py-2">
                           <p className="truncate text-sm font-semibold text-gray-900">{userInfo.name}</p>
                           <p className="truncate text-xs text-gray-500">{userInfo.email}</p>
                        </div>
                        <Link to="/profile" className="mt-1 flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                           <Settings className="mr-2 h-4 w-4" />
                           Profile
                        </Link>
                        <button onClick={logoutHandler} className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                           <LogOut className="mr-2 h-4 w-4" />
                           Sign out
                        </button>
                     </div>
                  </div>
               ) : (
                  <Link to="/auth" className="ml-2">
                     <Button>
                        <User className="mr-2 h-4 w-4" />
                        Sign in
                     </Button>
                  </Link>
               )}

               {userInfo?.isAdmin && (
                  <div className="group relative ml-2">
                     <Button variant="outline">Admin</Button>
                     <div className="invisible absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
                        <Link to="/admin/productlist" className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                           <Package className="mr-2 h-4 w-4" />
                           Products
                        </Link>
                        <Link to="/admin/userlist" className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                           <Users className="mr-2 h-4 w-4" />
                           Users
                        </Link>
                        <Link to="/admin/orderlist" className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                           <ShoppingBag className="mr-2 h-4 w-4" />
                           Orders
                        </Link>
                     </div>
                  </div>
               )}
            </nav>

            <Button
               variant="ghost"
               size="icon"
               className="md:hidden"
               onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
               {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
         </div>

         {isMobileMenuOpen && (
            <div className="border-t border-gray-200 bg-white md:hidden">
               <div className="container space-y-3 py-4">
                  <SearchBox />

                  {userInfo && (
                     <Link to="/wishlist" className="flex items-center justify-between rounded-md p-2 hover:bg-gray-50" onClick={closeMobileMenu}>
                        <span className="flex items-center gap-2"><Heart className="h-5 w-5" /> Wishlist</span>
                        {totalWishlistItems > 0 && <Badge variant="destructive">{totalWishlistItems}</Badge>}
                     </Link>
                  )}

                  <Link to="/cart" className="flex items-center justify-between rounded-md p-2 hover:bg-gray-50" onClick={closeMobileMenu}>
                     <span className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Cart</span>
                     {totalCartItems > 0 && <Badge>{totalCartItems}</Badge>}
                  </Link>

                  {userInfo ? (
                     <>
                        <Link to="/profile" className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-50" onClick={closeMobileMenu}>
                           <Settings className="h-5 w-5" /> Profile
                        </Link>
                        <button
                           onClick={() => {
                              logoutHandler();
                              closeMobileMenu();
                           }}
                           className="flex w-full items-center gap-2 rounded-md p-2 text-left text-red-600 hover:bg-red-50"
                        >
                           <LogOut className="h-5 w-5" /> Sign out
                        </button>
                     </>
                  ) : (
                     <Link to="/auth" className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-50" onClick={closeMobileMenu}>
                        <User className="h-5 w-5" /> Sign in
                     </Link>
                  )}

                  {userInfo?.isAdmin && (
                     <div className="border-t border-gray-100 pt-3">
                        <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Admin</p>
                        <Link to="/admin/productlist" className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-50" onClick={closeMobileMenu}>
                           <Package className="h-5 w-5" /> Products
                        </Link>
                        <Link to="/admin/userlist" className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-50" onClick={closeMobileMenu}>
                           <Users className="h-5 w-5" /> Users
                        </Link>
                        <Link to="/admin/orderlist" className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-50" onClick={closeMobileMenu}>
                           <ShoppingBag className="h-5 w-5" /> Orders
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         )}
      </header>
   );
};

export default Header;
