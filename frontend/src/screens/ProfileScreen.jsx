import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { X, Eye } from "lucide-react";
import { useProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [message, setMessage] = useState("");
   
   const dispatch = useDispatch();
   const { userInfo } = useSelector(state => state.auth);
   const [updateProfile, { isLoading: updateProfileLoading }] = useProfileMutation();
   const { data: orders, isLoading, error } = useGetMyOrdersQuery();

   useEffect(() => {
      if (userInfo) {
         setName(userInfo.name);
         setEmail(userInfo.email);
      }
   }, [userInfo]);

   const formSubmitHandler = async (event) => {
      event.preventDefault();
      setMessage("");
      
      if (password !== confirmPassword) {
         setMessage('Passwords do not match');
         return;
      }
      
      try {
         const responseData = await updateProfile({ 
            _id: userInfo._id, 
            name, 
            email, 
            password 
         }).unwrap();

         dispatch(setCredentials(responseData));
         setMessage('Profile updated successfully');
         setPassword("");
         setConfirmPassword("");
      } catch (err) {
         setMessage(err?.data?.message || err.error);
      }
   };

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="grid lg:grid-cols-4 gap-8">
            {/* User Profile Form */}
            <div className="lg:col-span-1">
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">User Profile</h2>
                  
                  {message && (
                     <div className="mb-4">
                        <Message variant={message.includes('successfully') ? 'success' : 'danger'}>
                           {message}
                        </Message>
                     </div>
                  )}

                  <form onSubmit={formSubmitHandler} className="space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                           Name
                        </label>
                        <Input
                           id="name"
                           type="text"
                           placeholder="Enter name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required
                        />
                     </div>
                     
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                           Email
                        </label>
                        <Input
                           id="email"
                           type="email"
                           placeholder="Enter email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                     </div>
                     
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                           Password
                        </label>
                        <Input
                           id="password"
                           type="password"
                           placeholder="Enter password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                     
                     <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                           Confirm Password
                        </label>
                        <Input
                           id="confirmPassword"
                           type="password"
                           placeholder="Enter password again"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                     </div>
                     
                     <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                        disabled={updateProfileLoading}
                     >
                        {updateProfileLoading ? 'Updating...' : 'Update Profile'}
                     </Button>
                  </form>
               </Card>
            </div>

            {/* Orders */}
            <div className="lg:col-span-3">
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>
                  
                  {isLoading ? (
                     <Loader />
                  ) : error ? (
                     <Message variant='danger'>
                        {error?.data?.message || error.error} 
                     </Message>
                  ) : orders?.length === 0 ? (
                     <div className="text-center py-8">
                        <p className="text-gray-500">No orders found.</p>
                     </div>
                  ) : (
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Paid
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Delivered
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
                                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
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
                  )}
               </Card>
            </div>
         </div>
      </div>
   );
};

export default ProfileScreen;