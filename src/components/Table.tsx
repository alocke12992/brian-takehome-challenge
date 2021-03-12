import { useState } from 'react';
import cn from 'classnames';
import './Table.scss';

/**
 * NOTE: Provide own keys on headers and rows
 */
interface ITableProps {
  headers: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >[];

  rows: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >[];

  rowsPerPage?: number; // Supply for pagination
}

/**
 * Keeping this simple makes it flexible. Adding icons, click actions (per row, per cell, on a certain word...) quickly gets ugly with hugely customized tables.
 */
export const Table = (props: ITableProps) => {
  const { headers, rows, rowsPerPage } = props;
  const [page, setPage] = useState(1); // Shortcoming to this approach is that when the component is unmounted, this state is lost. This is annoying in the case of view switching, where preserving this state might be preferable.

  const renderPaginationControls = () => {
    const pageCount = Math.ceil(rows.length / rowsPerPage!);

    return (
      <div className='pagination-controls'>
        {Array.from(Array(pageCount).keys()).map((index) => {
          const pageValue = index + 1; // Ew name because shadow kills equality check for className

          return (
            <button
              className={cn({ active: pageValue === page })}
              key={pageValue}
              onClick={() => setPage(pageValue)}
            >
              {pageValue}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className='table-component'>
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>

        <tbody>
          {rowsPerPage
            ? rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            : rows}
        </tbody>
      </table>
      {rowsPerPage ? renderPaginationControls() : null}
    </div>
  );
};
