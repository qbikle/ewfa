import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const gap = 2;

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > gap + 2) {
        pages.push("...");
      }

      for (let i = Math.max(2, currentPage - gap); i <= Math.min(totalPages - 1, currentPage + gap); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - (gap + 1)) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center">
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            className={`px-5 py-2 mx-1 border rounded ${
              page === currentPage
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-blue-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1 mx-1 text-gray-500">
            ...
          </span>
        )
      )}
    </div>
  );
};

export default Pagination;
