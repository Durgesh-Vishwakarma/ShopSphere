import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import { Button } from "../../components/ui/Button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { 
   useGetProductsQuery, 
   useCreateProductMutation, 
   useDeleteProductMutation 
} from "../../slices/productsApiSlice";

const ProductListScreen = () => {

   const { pageNumber } = useParams();
   const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

   const [createProduct, { isLoading: createLoading }] = useCreateProductMutation();
   const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();

   const deleteProductHandler = async (id) => {
      if (window.confirm('Are you sure you want to delete the product?')) {
         try {
            await deleteProduct(id);
            refetch();
         } catch (err) {
            // Handle error silently or with toast notification
         }
      }
   };   const createProductHandler = async () => {
      if (window.confirm('Are you sure you want to create a product?')) {
         try {
            await createProduct();
            refetch();
         } catch (err) {
            console.error('Create error:', err?.data?.message || err.error);
         }
      }
   };

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
               <p className="text-gray-600 mt-2">Manage your product inventory</p>
            </div>
            <Button 
               onClick={createProductHandler}
               className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
               <Plus className="w-4 h-4 mr-2" />
               Create Product
            </Button>
         </div>

         {createLoading && <Loader />}
         {deleteLoading && <Loader />}

         {isLoading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
         ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Brand
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {data?.products?.map((product) => (
                           <tr key={product._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                 {product._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                 {product.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                 ${product.price}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {product.category}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {product.brand}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                 <div className="flex items-center space-x-2">
                                    <Link
                                       to={`/admin/product/${product._id}/edit`}
                                       className="inline-flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition-colors"
                                    >
                                       <Edit className="w-4 h-4 mr-1" />
                                       Edit
                                    </Link>
                                    <Button 
                                       onClick={() => deleteProductHandler(product._id)}
                                       className="inline-flex items-center px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors"
                                    >
                                       <Trash2 className="w-4 h-4 mr-1" />
                                       Delete
                                    </Button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="px-6 py-4 border-t border-gray-200">
                  <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />
               </div>
            </div>
         )}
      </div>
   );
}

export default ProductListScreen;