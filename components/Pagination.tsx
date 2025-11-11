import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-3 justify-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className='px-4 py-2 h-[12px] w-[6px] text-black'
      >
       {"<"}
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className='px-4 py-2 h-[12px] w-[6px] text-black'
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
