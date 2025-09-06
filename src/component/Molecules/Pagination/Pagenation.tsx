import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  href: string
  className?: string
};

export const Pagination = ({ totalPage, currentPage, href, className }: PaginationProps) => {
  if (totalPage <= 1) return null

  let pageNumbers: number[] = []
  if (totalPage <= 5) {
    pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1)
  } else if (currentPage <= 3) {
    pageNumbers = [1, 2, 3, 4, 5]
  } else if (currentPage >= totalPage - 2) {
    pageNumbers = [totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage].filter(n => n > 0)
  } else {
    pageNumbers = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  const addParams = ( page: number ) => {
    if ( page < 1 ) return href + `?page=1`
    else if ( totalPage < page ) return href + `?page=${totalPage}`
    return href + `?page=${page}`
  }

  return (
    <nav aria-label="ページネーション" className={`flex justify-center ${className}`}>
      <a
        href={addParams(1)}
        aria-label="最初のページに戻る"
        className="flex items-center justify-center px-1 py-1 rounded-lg hover:bg-surface-variant"
      >
        <MaterialSymbols>keyboard_double_arrow_left</MaterialSymbols>
      </a>
      <a
        href={addParams(currentPage - 1)}
        aria-label="前のページに戻る"
        className="flex items-center justify-center px-1 py-1 rounded-lg hover:bg-surface-variant"
      >
        <MaterialSymbols>chevron_left</MaterialSymbols>
      </a>
      {pageNumbers.map((num) => (
        <a
          key={num}
          href={addParams(num)}
          aria-current={num === currentPage ? "page" : undefined}
          className={`body-2-bold flex items-center justify-center px-1 py-1 rounded-lg min-w-8 ${currentPage == num ? 'text-on-container bg-gray hover:bg-gray-dim' : 'hover:bg-surface-variant'}`}
        >
          {num}
        </a>
      ))}
      <a
        href={addParams(currentPage + 1)}
        aria-label="次のページに進む"
        className="flex items-center justify-center px-1 py-1 rounded-lg hover:bg-surface-variant"
      >
        <MaterialSymbols>chevron_right</MaterialSymbols>
      </a>
      <a
        href={addParams(totalPage)}
        aria-label="最後のページに進む"
        className="flex items-center justify-center px-1 py-1 rounded-lg hover:bg-surface-variant"
      >
        <MaterialSymbols>keyboard_double_arrow_right</MaterialSymbols>
      </a>
    </nav>
  );
};