import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { to: '/auth', label: 'Sign In', active: step1 },
    { to: '/shipping', label: 'Shipping', active: step2 },
    { to: '/payment', label: 'Payment', active: step3 },
    { to: '/placeorder', label: 'Place Order', active: step4 }
  ];

  return (
    <nav className="flex justify-center items-center mb-8 px-4">
      <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            {step.active ? (
              <Link
                to={step.to}
                className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 border-b-2 border-blue-600 transition-colors duration-200 whitespace-nowrap"
              >
                {step.label}
              </Link>
            ) : (
              <span className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-medium text-gray-400 cursor-not-allowed whitespace-nowrap">
                {step.label}
              </span>
            )}
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1 md:mx-2 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default CheckoutSteps;