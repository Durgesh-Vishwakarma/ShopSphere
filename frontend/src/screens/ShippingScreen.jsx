import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { saveShippingAddress } from "../slices/cartSlice";
import './ShippingScreen.css';

const ShippingScreen = () => {

   const cart = useSelector(state => state.cart);
   const { shippingAddress } = cart;

   const [address, setAddress] = useState(shippingAddress?.address || '');
   const [city, setCity] = useState(shippingAddress?.city || '');
   const [state, setState] = useState(shippingAddress?.state || '');
   const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
   const [country, setCountry] = useState(shippingAddress?.country || '');

   const dispatch = useDispatch();
   const navigate = useNavigate();
 

   const formSubmitHandler = event => {
      event.preventDefault();
      
      dispatch(saveShippingAddress({ address, city, state, postalCode, country }));
      navigate('/payment');
   };


   return (
      <FormContainer>
         <CheckoutSteps step1 step2 />
         
         <Card className="p-8 shadow-lg">
            <div className="text-center mb-8">
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Address</h1>
               <p className="text-gray-600">Enter your delivery information</p>
            </div>

            <form onSubmit={formSubmitHandler} className="space-y-6">
               <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                     Address
                  </label>
                  <Input
                     id="address"
                     type="text"
                     placeholder="Enter your address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                     City
                  </label>
                  <Input
                     id="city"
                     type="text"
                     placeholder="Enter your city"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                     State/Province
                  </label>
                  <Input
                     id="state"
                     type="text"
                     placeholder="Enter your state"
                     value={state}
                     onChange={(e) => setState(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                     Postal Code
                  </label>
                  <Input
                     id="postalCode"
                     type="text"
                     placeholder="Enter postal code"
                     value={postalCode}
                     onChange={(e) => setPostalCode(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                     Country
                  </label>
                  <Input
                     id="country"
                     type="text"
                     placeholder="Enter your country"
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                     required
                  />
               </div>

               <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  size="lg"
               >
                  Continue to Payment
               </Button>
            </form>
         </Card>
      </FormContainer>
   );
}

export default ShippingScreen;