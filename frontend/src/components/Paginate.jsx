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
      <nav className="flex items-center justify-center gap-2">
         {/* Previous Button */}
         {page > 1 && (
            <Link
               to={getPageUrl(page - 1)}
               className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-blue-50/50 hover:text-primary"
            >
               <ChevronLeft className="w-5 h-5" />
            </Link>
         )}

         {/* First page if not visible */}
         {visiblePages[0] > 1 && (
            <>
               <Link
                  to={getPageUrl(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-blue-50/50 hover:text-primary"
               >
                  1
               </Link>
               {visiblePages[0] > 2 && (
                  <span className="flex h-11 w-11 items-center justify-center text-gray-400">
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
               className={`flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200 ${
                  pageNum === page
                     ? 'border-primary bg-primary text-white shadow-sm'
                     : 'border-gray-300 bg-white text-gray-700 shadow-sm hover:-translate-y-0.5 hover:border-primary/40 hover:bg-blue-50/50 hover:text-primary'
               }`}
            >
               {pageNum}
            </Link>
         ))}

         {/* Last page if not visible */}
         {visiblePages[visiblePages.length - 1] < pages && (
            <>
               {visiblePages[visiblePages.length - 1] < pages - 1 && (
                  <span className="flex h-11 w-11 items-center justify-center text-gray-400">
                     ...
                  </span>
               )}
               <Link
                  to={getPageUrl(pages)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-blue-50/50 hover:text-primary"
               >
                  {pages}
               </Link>
            </>
         )}

         {/* Next Button */}
         {page < pages && (
            <Link
               to={getPageUrl(page + 1)}
               className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-blue-50/50 hover:text-primary"
            >
               <ChevronRight className="w-5 h-5" />
            </Link>
         )}
      </nav>
   );
};

export default Paginate;
