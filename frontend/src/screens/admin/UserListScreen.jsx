import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { X, Trash2, Edit, Check } from "lucide-react";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice";


const UserListScreen = () => {

   const { data: users, refetch, isLoading, error } = useGetUsersQuery();

   const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
   
   const deleteUserHandler = async id => {

      if (window.confirm('Are you sure you want to delete the user?')) {

         try {
            await deleteUser(id);
            refetch();
         } catch (err) {
            // Handle error silently or with toast notification
         }
      }
   };

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
         </div>

         {deleteLoading && <Loader />}      

         {isLoading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
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
                              Email
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Admin
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {users?.map((user) => (
                           <tr key={user._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                 {user._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                 {user.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                 <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800">
                                    {user.email}
                                 </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {user.isAdmin ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                 ) : (
                                    <X className="w-5 h-5 text-red-500" />
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                 <div className="flex items-center space-x-2">
                                    <Link
                                       to={`/admin/user/${user._id}/edit`}
                                       className="inline-flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition-colors"
                                    >
                                       <Edit className="w-4 h-4 mr-1" />
                                       Edit
                                    </Link>
                                    <Button 
                                       onClick={() => deleteUserHandler(user._id)}
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
            </div>
         )}
      </div>
   );
};

export default UserListScreen;