import { motion } from 'framer-motion';

const Loader = () => {
   return (
      <div className="flex items-center justify-center p-8">
         <div className="relative">
            {/* Outer ring */}
            <motion.div
               className="w-16 h-16 border-4 border-blue-200 rounded-full"
               animate={{ rotate: 360 }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner ring */}
            <motion.div
               className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full"
               animate={{ rotate: 360 }}
               transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center dot */}
            <motion.div
               className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
         </div>
      </div>
   );
};

export default Loader;