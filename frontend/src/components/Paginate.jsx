import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
   if (pages <= 1) return null;

   const getPageUrl = (pageNum) => {
      if (isAdmin) {
         return `/admin/productlist/${pageNum}`;
      }
      if (keyword) {
         return `/search/${keyword}/page/${pageNum}`;
      }
      return `/page/${pageNum}`;
   };

   const pageNumbers = [...Array(pages).keys()].map(x => x + 1);
   
   // Calculate visible page numbers
   const getVisiblePages = () => {
      const delta = 2; // Number of pages to show on each side of current page
      const start = Math.max(1, page - delta);
      const end = Math.min(pages, page + delta);
      
      return pageNumbers.slice(start - 1, end);
   };

   const visiblePages = getVisiblePages();

   return (
      <nav className="flex items-center justify-center space-x-1">
         {/* Previous Button */}
         {page > 1 && (
            <Link
               to={getPageUrl(page - 1)}
               className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
            >
               <ChevronLeft className="w-5 h-5" />
            </Link>
         )}

         {/* First page if not visible */}
         {visiblePages[0] > 1 && (
            <>
               <Link
                  to={getPageUrl(1)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
               >
                  1
               </Link>
               {visiblePages[0] > 2 && (
                  <span className="flex items-center justify-center w-10 h-10 text-gray-400">
                     ...
                  </span>
               )}
            </>
         )}

         {/* Visible page numbers */}
         {visiblePages.map(pageNum => (
            <Link
               key={pageNum}
               to={getPageUrl(pageNum)}
               className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors duration-200 ${
                  pageNum === page
                     ? 'border-blue-500 bg-blue-500 text-white'
                     : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
               }`}
            >
               {pageNum}
            </Link>
         ))}

         {/* Last page if not visible */}
         {visiblePages[visiblePages.length - 1] < pages && (
            <>
               {visiblePages[visiblePages.length - 1] < pages - 1 && (
                  <span className="flex items-center justify-center w-10 h-10 text-gray-400">
                     ...
                  </span>
               )}
               <Link
                  to={getPageUrl(pages)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
               >
                  {pages}
               </Link>
            </>
         )}

         {/* Next Button */}
         {page < pages && (
            <Link
               to={getPageUrl(page + 1)}
               className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
            >
               <ChevronRight className="w-5 h-5" />
            </Link>
         )}
      </nav>
   );
};

export default Paginate;