import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { ArrowLeft } from 'lucide-react';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import { getApiErrorMessage } from '../utils/errorUtils.js';

const HomeScreen = () => {
   const { keyword, pageNumber } = useParams();
   const { data, isLoading, error, refetch } = useGetProductsQuery({ keyword, pageNumber });

   return (
      <div className="space-y-8">
         {!keyword ? (
            <ProductCarousel />
         ) : (
            <Link
               to="/"
               className="btn-outline"
            >
               <ArrowLeft className="mr-2 h-4 w-4" />
               Back to home
            </Link>
         )}

         {isLoading ? (
            <div className="flex justify-center py-16">
               <Loader label="Loading products" />
            </div>
         ) : error ? (
            <Message variant="danger">
               <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span>{getApiErrorMessage(error)}</span>
                  <button
                     type="button"
                     onClick={refetch}
                     className="btn-outline h-10 border-red-200 px-4 py-2 text-red-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                     Retry
                  </button>
               </div>
            </Message>
         ) : (
            <section className="space-y-6">
               <div className="flex flex-col justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-end">
                  <div>
                     <p className="section-kicker mb-2">
                        {keyword ? `Search results for "${keyword}"` : 'Latest products'}
                     </p>
                     <h2 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
                        {keyword ? 'Search Results' : 'New Arrivals'}
                     </h2>
                  </div>
                  <p className="text-sm text-gray-600">
                     {data.products.length} product{data.products.length === 1 ? '' : 's'} found
                  </p>
               </div>

               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {data.products.map((product) => (
                     <Product key={product._id} product={product} />
                  ))}
               </div>

               <div className="flex justify-center pt-4">
                  <Paginate
                     pages={data.pages}
                     page={data.page}
                     keyword={keyword ? keyword : ''}
                  />
               </div>
            </section>
         )}
      </div>
   );
};

export default HomeScreen;
