import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
   const { data: products, isLoading, error } = useGetTopProductsQuery();
   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
      if (products && products.length > 0) {
         const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % products.length);
         }, 5000);
         return () => clearInterval(timer);
      }
   }, [products]);

   const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
   };

   const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
   };

   if (isLoading) return <Loader />;
   
   if (error) {
      return (
         <Message variant='danger'>
           {error.data?.message || error.error || error.status || "Something went wrong"}
         </Message>
      );
   }

   if (!products || products.length === 0) return null;

   return (
      <div className="relative h-[300px] md:h-[380px] lg:h-[450px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 mb-8 shadow-2xl group mx-0">
         <AnimatePresence mode="wait">
            <motion.div
               key={currentSlide}
               initial={{ opacity: 0, scale: 1.02 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               transition={{ duration: 0.6, ease: "easeInOut" }}
               className="relative h-full"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/50 z-10" />
               
               <img 
                  src={products[currentSlide].image} 
                  alt={products[currentSlide].name}
                  className="w-full h-full object-cover object-center"
               />

               <div className="absolute inset-0 z-20 flex items-center">
                  <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
                     <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left px-2">
                           <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full font-bold text-sm mb-4 shadow-lg"
                           >
                              <Sparkles className="w-5 h-5" />
                              <span>FEATURED PRODUCT</span>
                           </motion.div>

                           <motion.h1 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                           >
                              {products[currentSlide].name}
                           </motion.h1>

                           <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className="flex items-center justify-center lg:justify-start space-x-2 mb-6"
                           >
                              {[...Array(5)].map((_, i) => (
                                 <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                       i < Math.floor(products[currentSlide].rating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-white/30'
                                    }`}
                                 />
                              ))}
                              <span className="text-white/90 text-base ml-3 font-medium">
                                 ({products[currentSlide].numReviews} reviews)
                              </span>
                           </motion.div>

                           <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                              className="text-4xl md:text-5xl font-bold text-white mb-8"
                           >
                              <span className="text-green-400">$</span>{products[currentSlide].price}
                           </motion.div>

                           <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                              className="flex flex-col sm:flex-row gap-4"
                           >
                              <Link 
                                 to={`/product/${products[currentSlide]._id}`}
                                 className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                              >
                                 <span className="text-lg">Shop Now</span>
                                 <ChevronRight className="w-5 h-5" />
                              </Link>
                              <Link 
                                 to={`/product/${products[currentSlide]._id}`}
                                 className="border-2 border-white/80 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                              >
                                 View Details
                              </Link>
                           </motion.div>
                        </div>

                        {/* Right Content - Product Image */}
                        <div className="hidden lg:flex justify-center items-center">
                           <motion.div
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                              className="relative max-w-sm"
                           >
                              <img 
                                 src={products[currentSlide].image} 
                                 alt={products[currentSlide].name}
                                 className="w-full h-auto rounded-xl shadow-2xl border-4 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
                           </motion.div>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </AnimatePresence>

         {/* Navigation Buttons */}
         <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
         >
            <ChevronLeft className="w-6 h-6" />
         </button>
         
         <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
         >
            <ChevronRight className="w-6 h-6" />
         </button>

         {/* Slide Indicators */}
         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {products.map((_, index) => (
               <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${ 
                     index === currentSlide 
                        ? 'w-10 h-2 bg-white rounded-full shadow-lg' 
                        : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                  }`}
               />
            ))}
         </div>
      </div>
   );
};

export default ProductCarousel;
