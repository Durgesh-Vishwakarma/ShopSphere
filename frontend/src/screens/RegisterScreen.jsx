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

  const isPasswordComplex = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value);
  const isEmailValid = (value) => /\S+@\S+\.\S+/.test(value);

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [userInfo, navigate, redirect]);

   
   const formSubmitHandler = async (event) => {
      event.preventDefault();
      setError('');

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isEmailValid(normalizedEmail)) {
      setError('Please provide a valid email');
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      setError('Name must be between 2 and 50 characters');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!isPasswordComplex(password)) {
      setError('Password must contain at least one lowercase letter, one uppercase letter, and one number');
      return;
    }

      if (password !== confirmPassword) {
         setError('Passwords do not match');
         return;
      }

      try {
         const responseData = await register({
            name: trimmedName,
            email: normalizedEmail,
            password,
         }).unwrap();
         dispatch(setCredentials({ ...responseData }));
         navigate(redirect);
      } catch (err) {
         const validationError = err?.data?.errors?.[0]?.message;
         setError(validationError || err?.data?.message || err.error || 'Registration failed');
      }
   };

   return (
      <FormContainer>
         <Card className="p-8">
           <div className="text-center mb-8">
             <h1 className="text-2xl font-semibold text-gray-950 mb-2">Create Account</h1>
             <p className="text-gray-600">Create an account to place orders and save your cart.</p>
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
               <p className="mt-1 text-xs text-gray-500">
                 Use at least 6 characters with uppercase, lowercase, and a number.
               </p>
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
               className="w-full"
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
                 className="font-medium text-primary hover:text-primary/80"
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
