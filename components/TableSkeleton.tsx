const threeRows = Array.from({ length: 3 }, (_, i) => i);
const sevenCols = Array.from({ length: 7 }, (_, i) => i);

export default function TableSkeleton() {
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-500 dark:divide-black">
      {threeRows.map((row) => (
        <tr
          className="odd:bg-gray-100 even:bg-gray-0 dark:odd:bg-gray-700 dark:even:bg-gray-800"
          key={row}
        >
          {sevenCols.map((cell) => (
            <td className="animate-pulse h-12 px-3 py-2" key={cell}>
              <div className="h-3 bg-gray-300 rounded w-2/3" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
