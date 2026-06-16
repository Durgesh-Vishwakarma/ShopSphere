import { motion } from 'framer-motion';

const Loader = ({ label = 'Loading' }) => {
   const bars = [0, 1, 2];

   return (
      <div className="flex items-center justify-center p-8" role="status" aria-live="polite">
         <div className="flex min-w-48 flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm">
            <div className="flex h-10 items-end gap-2">
               {bars.map((bar) => (
                  <motion.span
                     key={bar}
                     className="block w-2.5 rounded-full bg-primary"
                     initial={{ height: 16, opacity: 0.45 }}
                     animate={{ height: [16, 34, 20, 28, 16], opacity: [0.45, 1, 0.7, 0.9, 0.45] }}
                     transition={{
                        duration: 1.25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: bar * 0.14,
                     }}
                  />
               ))}
            </div>

            <div className="space-y-1 text-center">
               <p className="text-sm font-semibold text-gray-900">{label}</p>
               <p className="text-xs text-gray-500">Getting things ready...</p>
            </div>
         </div>
      </div>
   );
};

export default Loader;
