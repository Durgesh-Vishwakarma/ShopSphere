import { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { X, Eye } from "lucide-react";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
   const [page, setPage] = useState(1);
   const limit = 20;

   const { data, isLoading, error } = useGetOrdersQuery({ page, limit });

   const orders = Array.isArray(data) ? data : data?.orders || [];
   const pages = Array.isArray(data) ? 1 : data?.pages || 1;

   return (
      <div className="py-2">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
            <p className="text-gray-600 mt-2">Manage all customer orders</p>
         </div>

         {isLoading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Payment
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Delivery
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {orders?.map((order) => (
                           <tr key={order._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                 {order._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                 {order.user && order.user.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                 ${order.totalPrice}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {order.isPaid ? (
                                    <Badge variant="success">
                                       {new Date(order.paidAt).toLocaleDateString()}
                                    </Badge>
                                 ) : (
                                    <X className="w-5 h-5 text-red-500" />
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {order.isDelivered ? (
                                    <Badge variant="success">
                                       {new Date(order.deliveredAt).toLocaleDateString()}
                                    </Badge>
                                 ) : (
                                    <X className="w-5 h-5 text-red-500" />
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <Link
                                    to={`/order/${order._id}`}
                                    className="btn-outline h-10 px-3 py-2"
                                 >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Details
                                 </Link>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {pages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                     <Button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        variant="outline"
                     >
                        Previous
                     </Button>
                     <span className="text-sm text-gray-600">
                        Page {page} of {pages}
                     </span>
                     <Button
                        onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
                        disabled={page === pages}
                        variant="outline"
                     >
                        Next
                     </Button>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default OrderListScreen;
