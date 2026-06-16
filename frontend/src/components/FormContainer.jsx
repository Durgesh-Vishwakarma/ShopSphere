const FormContainer = ({ children }) => {
   return (
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
         <div className="w-full max-w-xl space-y-8">
            {children}
         </div>
      </div>
   );
};

export default FormContainer;
