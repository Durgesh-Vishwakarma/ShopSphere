import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import store from './store.js';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import usePerformanceMonitoring from './hooks/usePerformanceMonitoring';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';
import WishlistScreen from './screens/WishlistScreen.jsx';
import AboutScreen from './screens/AboutScreen.jsx';
import ContactScreen from './screens/ContactScreen.jsx';
import HelpCenterScreen from './screens/HelpCenterScreen.jsx';
import ShippingInfoScreen from './screens/ShippingInfoScreen.jsx';
import ReturnsScreen from './screens/ReturnsScreen.jsx';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen.jsx';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen.jsx';
import FAQScreen from './screens/FAQScreen.jsx';
import ProductsScreen from './screens/ProductsScreen.jsx';
import TrackOrderScreen from './screens/TrackOrderScreen.jsx';
import CookiePolicyScreen from './screens/CookiePolicyScreen.jsx';


// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error) => {
        if (error.status === 404) return false;
        return failureCount < 2;
      },
    },
  },
});

// Performance Monitoring Component
const PerformanceWrapper = ({ children }) => {
  usePerformanceMonitoring();
  return children;
};

// Service Worker Registration
const registerSW = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available
            if (confirm('New version available! Reload to update?')) {
              window.location.reload();
            }
          }
        });
      });
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/wishlist' element={<WishlistScreen />} />
      <Route path='/about' element={<AboutScreen />} />
      <Route path='/contact' element={<ContactScreen />} />
      <Route path='/help' element={<HelpCenterScreen />} />
      <Route path='/shipping-info' element={<ShippingInfoScreen />} />
      <Route path='/returns' element={<ReturnsScreen />} />
      <Route path='/privacy' element={<PrivacyPolicyScreen />} />
      <Route path='/terms' element={<TermsOfServiceScreen />} />
      <Route path='/faq' element={<FAQScreen />} />
      <Route path='/products' element={<ProductsScreen />} />
      <Route path='/track' element={<TrackOrderScreen />} />
      <Route path='/cookies' element={<CookiePolicyScreen />} />
      <Route path='/auth' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Provider store={store}>
          <PayPalScriptProvider deferLoading={false}>
            <PerformanceWrapper>
              <RouterProvider router={router} />
            </PerformanceWrapper>
          </PayPalScriptProvider>
        </Provider>
      </HelmetProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
);

// Register service worker
registerSW();

reportWebVitals();