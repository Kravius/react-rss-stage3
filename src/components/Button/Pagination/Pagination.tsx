import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 6) onPageChange(currentPage + 1);
  };

  return (
    <>
      <button onClick={handlePreviousPage}>Prev</button>
      <button onClick={handleNextPage}>Next</button>
    </>
  );
};

export default Pagination;
