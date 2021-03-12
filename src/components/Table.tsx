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
}

/**
 * Keeping this simple makes it flexible. Adding icons, click actions (per row, per cell, on a certain word...) quickly gets ugly with hugely customized tables.
 */
export const Table = (props: ITableProps) => {
  const { headers, rows } = props;

  return (
    <table className='table-component'>
      <thead>
        <tr>{headers}</tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
};
