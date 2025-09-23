import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [login, { isLoading }] = useLoginMutation();
   const { userInfo } = useSelector(state => state.auth);

   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const redirect = searchParams.get('redirect') || '/';

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [userInfo, navigate, redirect]);

   const formSubmitHandler = async (event) => {
      event.preventDefault();
      setError('');
      
      try {
         const responseData = await login({ email, password }).unwrap();
         dispatch(setCredentials({ ...responseData }));
         navigate(redirect);
      } catch (err) {
         setError(err?.data?.message || err.error);
      }
   };

   return (
      <FormContainer>
         <Card className="p-8 shadow-lg">
           <div className="text-center mb-8">
             <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
             <p className="text-gray-600">Sign in to continue your shopping journey</p>
           </div>

           {error && (
             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
               {error}
             </div>
           )}

           <form onSubmit={formSubmitHandler} className="space-y-6">
             <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                 Email Address
               </label>
               <Input
                 id="email"
                 type="email"
                 placeholder="Enter your email"
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
                 placeholder="Enter your password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
             </div>

             <Button
               type="submit"
               disabled={isLoading}
               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
               size="lg"
             >
               {isLoading ? 'Signing In...' : 'Sign In'}
             </Button>

             {isLoading && (
               <div className="flex justify-center">
                 <Loader />
               </div>
             )}
           </form>

           <div className="mt-6 text-center">
             <p className="text-sm text-gray-600">
               New Customer?{' '}
               <Link
                 to={redirect ? `/register?redirect=${redirect}` : `/register`}
                 className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
               >
                 Register Now
               </Link>
             </p>
           </div>
         </Card>
      </FormContainer>
   );
};

export default LoginScreen;