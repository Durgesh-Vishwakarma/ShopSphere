import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useState } from 'react';

const Message = ({ variant = 'info', children, dismissible = false, onDismiss }) => {
   const [isVisible, setIsVisible] = useState(true);

   const variants = {
      success: {
         bg: 'bg-green-50 border-green-200',
         text: 'text-green-800',
         icon: CheckCircle,
         iconColor: 'text-green-500'
      },
      danger: {
         bg: 'bg-red-50 border-red-200',
         text: 'text-red-800',
         icon: XCircle,
         iconColor: 'text-red-500'
      },
      warning: {
         bg: 'bg-yellow-50 border-yellow-200',
         text: 'text-yellow-800',
         icon: AlertCircle,
         iconColor: 'text-yellow-500'
      },
      info: {
         bg: 'bg-blue-50 border-blue-200',
         text: 'text-blue-800',
         icon: Info,
         iconColor: 'text-blue-500'
      }
   };

   const config = variants[variant] || variants.info;
   const IconComponent = config.icon;

   const handleDismiss = () => {
      setIsVisible(false);
      if (onDismiss) {
         onDismiss();
      }
   };

   if (!isVisible) return null;

   return (
      <motion.div
         initial={{ opacity: 0, y: -10, scale: 0.95 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         exit={{ opacity: 0, y: -10, scale: 0.95 }}
         transition={{ duration: 0.2 }}
         className={`border rounded-lg p-4 ${config.bg} ${config.text} shadow-sm`}
      >
         <div className="flex items-start space-x-3">
            <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
            <div className="flex-1 text-sm leading-relaxed">
               {children}
            </div>
            {dismissible && (
               <button
                  onClick={handleDismiss}
                  className={`flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors ${config.iconColor}`}
               >
                  <X className="w-4 h-4" />
               </button>
            )}
         </div>
      </motion.div>
   );
};

export default Message;