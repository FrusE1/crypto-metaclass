import React from "react";

import classNames from "classnames";

import styles from "./Pagination.module.scss";

/** Пропсы, которые принимает компонент CoinDescription */
export type PaginationProps = {
  /** Количество страниц */
  pages: number[];
  /** Номер страницы */
  currentPage: number;
  /** Номер страницы */
  loadingPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  pages,
  currentPage,
  loadingPage,
}: PaginationProps) => {
  function isRenderItemPagination(page: number): boolean {
    return (
      page === 1 ||
      (currentPage === 1 && page === 3) ||
      (currentPage === pages[pages.length - 1] &&
        page === pages[pages.length - 3]) ||
      (page <= currentPage + 1 && page >= currentPage - 1) ||
      page === pages[pages.length - 1]
    );
  }

  function isRenderDots(page: number): boolean {
    return (
      page === currentPage + 2 ||
      page === currentPage - 2 ||
      (currentPage === 1 && page === 4) ||
      (currentPage === pages[pages.length - 1] &&
        page === pages[pages.length - 4])
    );
  }

  return (
    <div className={styles.pagination}>
      {pages.map((page) => {
        if (isRenderItemPagination(page)) {
          return (
            <div
              key={page}
              className={classNames(
                styles.pagination__item,
                currentPage === page && styles.current
              )}
              onClick={() => loadingPage(page)}
            >
              {page}
            </div>
          );
        } else if (isRenderDots(page)) {
          return (
            <div key={page} className={classNames(styles.pagination__dots)}>
              ...
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Pagination;
