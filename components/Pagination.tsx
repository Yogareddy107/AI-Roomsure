import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const baseButtonClass = "mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors";
  const activeButtonClass = "mx-1 px-3 py-2 text-sm font-medium text-white bg-oyo-red border border-oyo-red rounded-md z-10";
  const disabledButtonClass = "opacity-50 cursor-not-allowed";

  return (
    <nav className="flex items-center justify-center mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButtonClass} ${currentPage === 1 ? disabledButtonClass : ''}`}
        aria-label="Previous page"
      >
        Previous
      </button>

      <div className="hidden sm:flex mx-2">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={currentPage === number ? activeButtonClass : baseButtonClass}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
      </div>
      
      <span className="sm:hidden mx-4 text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButtonClass} ${currentPage === totalPages ? disabledButtonClass : ''}`}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;