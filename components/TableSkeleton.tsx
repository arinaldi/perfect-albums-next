import { FC } from 'react';

const threeRows = Array.from({ length: 3 }, (_, i) => i);
const sevenCols = Array.from({ length: 7 }, (_, i) => i);

const TableSkeleton: FC = () => (
  <tbody className="bg-white divide-y divide-gray-200">
    {threeRows.map(row => (
      <tr
        className="odd:bg-gray-50"
        key={row}
      >
        {sevenCols.map(cell => (
          <td
            className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
            key={cell}
          >
            —
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default TableSkeleton;
