import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../slices/wishlistSlice";
import toast from "react-hot-toast";
import Rating from "./Rating";

const Product = ({ product }) => {
   const dispatch = useDispatch();
   const { userInfo } = useSelector(state => state.auth);
   const { wishlistItems } = useSelector(state => state.wishlist);

   const isInWishlist = wishlistItems.some(item => item._id === product._id);
   const imageVariants = product.imageVariants || null;
   const cardImage = imageVariants?.card || product.image;
   const cardSrcSet = imageVariants
      ? `${imageVariants.thumb} 200w, ${imageVariants.card} 480w, ${imageVariants.full} 800w`
      : undefined;
   const cardSizes = '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

   const addToCartHandler = () => {
      if (product.countInStock === 0) {
         toast.error('Product is out of stock');
         return;
      }

      dispatch(addToCart({ ...product, qty: 1 }));
      toast.success('Product added to cart');
   };

   const wishlistHandler = () => {
      if (!userInfo) {
         toast.error('Please sign in to add to wishlist');
         return;
      }

      if (isInWishlist) {
         dispatch(removeFromWishlist(product._id));
         toast.success('Removed from wishlist');
      } else {
         dispatch(addToWishlist(product));
         toast.success('Added to wishlist');
      }
   };

   return (
      <article className="card h-full overflow-hidden">
         <Link to={`/product/${product._id}`} className="block aspect-[4/3] bg-gray-100">
            <img
               src={cardImage}
               srcSet={cardSrcSet}
               sizes={cardSrcSet ? cardSizes : undefined}
               alt={product.name}
               loading="lazy"
               decoding="async"
               className="h-full w-full object-cover"
            />
         </Link>

         <div className="flex h-[calc(100%-theme(spacing.0))] flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-3">
               <div className="min-w-0">
                  {product.category && (
                     <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                        {product.category}
                     </p>
                  )}
                  <Link to={`/product/${product._id}`} className="block">
                     <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 hover:text-primary">
                        {product.name}
                     </h3>
                  </Link>
               </div>

               <button
                  type="button"
                  onClick={wishlistHandler}
                  className={`shrink-0 rounded-md border p-2 transition-colors ${
                     isInWishlist
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-gray-200 bg-white text-gray-500 hover:text-gray-900'
                  }`}
                  title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
               >
                  <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
               </button>
            </div>

            <Rating value={product.rating} text={`${product.numReviews || 0} reviews`} />

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
               <div>
                  <p className="text-lg font-semibold text-gray-950">${product.price}</p>
                  <p className={`text-xs ${product.countInStock > 0 ? 'text-green-700' : 'text-red-600'}`}>
                     {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                  </p>
               </div>

               <button
                  type="button"
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
               >
                  <ShoppingCart className="h-4 w-4" />
                  Add
               </button>
            </div>
         </div>
      </article>
   );
};

export default Product;
