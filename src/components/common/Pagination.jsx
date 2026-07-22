function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Product pagination" className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            <i className="bi bi-chevron-left" />
          </button>
        </li>

        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            <i className="bi bi-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
