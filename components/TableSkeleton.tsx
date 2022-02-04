const threeRows = Array.from({ length: 3 }, (_, i) => i);
const sevenCols = Array.from({ length: 6 }, (_, i) => i);

export default function TableSkeleton() {
  return (
    <tbody className="divide-y divide-gray-200 bg-white dark:divide-black dark:bg-gray-500">
      {threeRows.map((row) => (
        <tr
          className="even:bg-gray-0 odd:bg-gray-100 dark:odd:bg-gray-700 dark:even:bg-gray-800"
          key={row}
        >
          {sevenCols.map((cell) => (
            <td className="h-12 animate-pulse px-3 py-2" key={cell}>
              <div className="h-3 w-2/3 rounded bg-gray-300" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
