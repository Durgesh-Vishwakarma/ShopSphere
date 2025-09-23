import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { ArrowLeft, Filter, Grid, List, SortAsc } from 'lucide-react';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Meta from '../components/Meta';

const ProductsScreen = () => {
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
      <>
         <Meta title="All Products | ShopSphere" description="Browse our complete collection of premium products." />
         
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 py-8"
         >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
               >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                     All <span className="text-orange-500">Products</span>
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                     Discover our complete collection of premium products
                  </p>
               </motion.div>

               {keyword && (
                  <motion.div
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ duration: 0.3 }}
                     className="mb-6"
                  >
                     <Link 
                        to='/products' 
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
                     >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to All Products
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
                     {/* Filter Bar */}
                     <motion.div 
                        variants={itemVariants}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                     >
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                           <div className="flex items-center space-x-4">
                              <span className="text-gray-700 font-medium">
                                 {data.products.length} Products Found
                              </span>
                              {keyword && (
                                 <span className="text-gray-500">
                                    for "{keyword}"
                                 </span>
                              )}
                           </div>
                           <div className="flex items-center space-x-3">
                              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                 <Filter className="w-4 h-4" />
                                 <span>Filter</span>
                              </button>
                              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                 <SortAsc className="w-4 h-4" />
                                 <span>Sort</span>
                              </button>
                              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                 <button className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <Grid className="w-4 h-4" />
                                 </button>
                                 <button className="p-2 hover:bg-gray-100 transition-colors">
                                    <List className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                        </div>
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
            </div>
         </motion.div>
      </>
   );
};

export default ProductsScreen;