import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { ArrowLeft, Star, TrendingUp } from 'lucide-react';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';

const HomeScreen = () => {
   const { keyword, pageNumber } = useParams();
   const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1
         }
      }
   };

   const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: {
            duration: 0.5
         }
      }
   };

   return (
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="space-y-8"
      >
         {!keyword ? (
            <ProductCarousel />
         ) : (
            <motion.div
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.3 }}
            >
               <Link 
                  to='/' 
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
               >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
               </Link>
            </motion.div>
         )}

         {isLoading ? (
            <div className="flex justify-center items-center py-20">
               <Loader />
            </div>
         ) : error ? (
            <Message variant='danger'>
               {error?.data?.message || error.error}
            </Message>
         ) : (
            <motion.div
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className="space-y-8"
            >
               {/* Header Section */}
               <motion.div 
                  variants={itemVariants}
                  className="text-center space-y-4"
               >
                  <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
                     {keyword ? (
                        <Star className="w-6 h-6" />
                     ) : (
                        <TrendingUp className="w-6 h-6" />
                     )}
                     <span className="text-sm font-medium tracking-wide uppercase">
                        {keyword ? `Search Results for "${keyword}"` : 'Featured Collection'}
                     </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                     {keyword ? 'Search Results' : 'Latest Products'}
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                     Discover our carefully curated selection of premium products
                  </p>
               </motion.div>

               {/* Products Grid */}
               <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
               >
                  {data.products.map((product, index) => (
                     <motion.div
                        key={product._id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                     >
                        <Product product={product} />
                     </motion.div>
                  ))}
               </motion.div>

               {/* Pagination */}
               <motion.div 
                  variants={itemVariants}
                  className="flex justify-center pt-8"
               >
                  <Paginate 
                     pages={data.pages} 
                     page={data.page} 
                     keyword={keyword ? keyword : ''} 
                  />
               </motion.div>
            </motion.div>
         )}
      </motion.div>
   );
};

export default HomeScreen;