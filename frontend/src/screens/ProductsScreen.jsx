import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { ArrowLeft } from 'lucide-react';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Meta from '../components/Meta';
import { getApiErrorMessage } from '../utils/errorUtils.js';

const ProductsScreen = () => {
   const { keyword, pageNumber } = useParams();
   const { data, isLoading, error, refetch } = useGetProductsQuery({ keyword, pageNumber });

   return (
      <>
         <Meta title="Products | ShopSphere" description="Browse products available on ShopSphere." />

         <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-end">
               <div>
                  <p className="section-kicker mb-2">Catalog</p>
                  <h1 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
                     Products
                  </h1>
                  <p className="mt-2 text-sm text-gray-600">
                     Browse available items and add them to your cart.
                  </p>
               </div>

               {keyword && (
                  <Link
                     to="/products"
                     className="btn-outline"
                  >
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     All products
                  </Link>
               )}
            </div>

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
               <section className="space-y-5">
                  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                     {data.products.length} product{data.products.length === 1 ? '' : 's'} found
                     {keyword && <span className="text-gray-500"> for "{keyword}"</span>}
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
      </>
   );
};

export default ProductsScreen;
