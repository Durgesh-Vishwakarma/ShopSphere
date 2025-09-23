import { Star } from 'lucide-react';

const Rating = ({ value, text }) => {
   return (
      <div className='flex items-center space-x-2'>
         <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
               const starValue = index + 1;
               const isFilled = value >= starValue;
               const isHalfFilled = value >= starValue - 0.5 && value < starValue;
               
               return (
                  <div key={index} className="relative">
                     <Star 
                        className={`w-4 h-4 ${
                           isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                     />
                     {isHalfFilled && (
                        <div className="absolute top-0 left-0 w-2 overflow-hidden">
                           <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
         {text && (
            <span className="text-sm text-gray-600">{text}</span>
         )}
      </div>
   );
};

export default Rating;