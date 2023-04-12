import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
type PaginationProps = { onPageChange: (a: number) => void };
const Pagination: React.FC<PaginationProps> = ({ onPageChange }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onPageChange(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
