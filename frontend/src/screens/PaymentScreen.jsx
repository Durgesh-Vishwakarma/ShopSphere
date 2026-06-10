import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { savePaymentMethod } from "../slices/cartSlice";


const PaymentScreen = () => {

   const [paymentMethod, setPaymentMethod] = useState('PayPal');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const cart = useSelector(state => state.cart);
   const { shippingAddress } = cart;

   useEffect(() => {
      if (!shippingAddress) {
         navigate('/shipping');
      }
   }, [shippingAddress, navigate]);

   const formSubmitHandler = event => {
      event.preventDefault();

      dispatch(savePaymentMethod(paymentMethod));
      navigate('/placeorder');
   }; 


   return (
      <FormContainer>
         <CheckoutSteps step1 step2 step3 />

         <Card className="p-8">
            <div className="text-center mb-8">
               <h1 className="text-2xl font-semibold text-gray-950 mb-2">Payment Method</h1>
               <p className="text-gray-600">Choose how you want to pay.</p>
            </div>

            <form onSubmit={formSubmitHandler} className="space-y-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                     Select Payment Method
                  </label>
                  <div className="space-y-3">
                     <label className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                        <input
                           type="radio"
                           name="paymentMethod"
                           value="PayPal"
                           checked={paymentMethod === 'PayPal'}
                           onChange={(e) => setPaymentMethod(e.target.value)}
                           className="mr-3 text-primary"
                        />
                        <div className="flex-1">
                           <span className="text-sm font-medium text-gray-900">PayPal or Credit Card</span>
                           <p className="text-sm text-gray-500">Secure payment with PayPal</p>
                        </div>
                     </label>
                  </div>
               </div>

               <Button
                  type="submit"
                  className="w-full"
                  size="lg"
               >
                  Continue to Review Order
               </Button>
            </form>
         </Card>
      </FormContainer>
   );
}

export default PaymentScreen;
