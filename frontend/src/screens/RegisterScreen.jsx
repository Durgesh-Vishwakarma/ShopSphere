import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [register, { isLoading }] = useRegisterMutation();
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

      if (password !== confirmPassword) {
         setError('Passwords do not match');
         return;
      }

      try {
         const responseData = await register({ name, email, password }).unwrap();
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
             <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
             <p className="text-gray-600">Join ShopSphere and start your shopping journey</p>
           </div>

           {error && (
             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
               {error}
             </div>
           )}

           <form onSubmit={formSubmitHandler} className="space-y-6">
             <div>
               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                 Full Name
               </label>
               <Input
                 id="name"
                 type="text"
                 placeholder="Enter your full name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required
               />
             </div>

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
                 placeholder="Enter password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
             </div>

             <div>
               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                 Confirm Password
               </label>
               <Input
                 id="confirmPassword"
                 type="password"
                 placeholder="Confirm your password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
               />
             </div>

             <Button
               type="submit"
               disabled={isLoading}
               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
               size="lg"
             >
               {isLoading ? 'Creating Account...' : 'Create Account'}
             </Button>

             {isLoading && (
               <div className="flex justify-center">
                 <Loader />
               </div>
             )}
           </form>

           <div className="mt-6 text-center">
             <p className="text-sm text-gray-600">
               Already have an account?{' '}
               <Link
                 to={redirect ? `/auth?redirect=${redirect}` : `/auth`}
                 className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
               >
                 Sign in
               </Link>
             </p>
           </div>
         </Card>
      </FormContainer>
   );
};

export default RegisterScreen;