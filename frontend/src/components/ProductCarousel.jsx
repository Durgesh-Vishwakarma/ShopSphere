import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "./Loader";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
   const { data: products, isLoading, error } = useGetTopProductsQuery();
   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
      if (products && products.length > 0) {
         const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % products.length);
         }, 6000);
         return () => clearInterval(timer);
      }
   }, [products]);

   if (isLoading) return <Loader label="Loading featured products" />;

   if (error) return null;

   if (!products || products.length === 0) return null;

   const product = products[currentSlide];
   const imageVariants = product?.imageVariants || null;
   const heroImage = imageVariants?.carousel || product.image;
   const heroSrcSet = imageVariants
      ? `${imageVariants.card} 480w, ${imageVariants.carousel} 1200w, ${imageVariants.full} 1600w`
      : undefined;

   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % products.length);
   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);

   return (
      <section className="mb-10 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm shadow-gray-950/5">
         <div className="grid min-h-[380px] md:grid-cols-2">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
               <p className="section-kicker mb-3">Featured Product</p>
               <h1 className="mb-4 max-w-xl text-3xl font-semibold leading-tight text-gray-950 md:text-4xl">
                  {product.name}
               </h1>
               <p className="mb-6 text-sm text-gray-600">
                  ${product.price} · {product.numReviews || 0} reviews
               </p>
               <div className="flex flex-wrap gap-3">
                  <Link to={`/product/${product._id}`} className="btn-primary">
                     View product
                  </Link>
                  <Link to="/products" className="btn-outline">
                     Browse all
                  </Link>
               </div>
            </div>

            <Link to={`/product/${product._id}`} className="block bg-gray-100">
               <img
                  src={heroImage}
                  srcSet={heroSrcSet}
                  sizes={heroSrcSet ? '100vw' : undefined}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-64 w-full object-cover md:h-full"
               />
            </Link>
         </div>

         <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
            <div className="flex gap-2">
               {products.map((_, index) => (
                  <button
                     key={index}
                     type="button"
                     onClick={() => setCurrentSlide(index)}
                     className={`h-2 rounded-full transition-colors ${index === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`}
                     aria-label={`Show featured product ${index + 1}`}
                  />
               ))}
            </div>

            <div className="flex gap-2">
               <button type="button" onClick={prevSlide} className="btn-outline h-10 w-10 px-0 py-0" aria-label="Previous featured product">
                  <ChevronLeft className="h-4 w-4" />
               </button>
               <button type="button" onClick={nextSlide} className="btn-outline h-10 w-10 px-0 py-0" aria-label="Next featured product">
                  <ChevronRight className="h-4 w-4" />
               </button>
            </div>
         </div>
      </section>
   );
};

export default ProductCarousel;
