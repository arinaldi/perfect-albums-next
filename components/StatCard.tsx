interface Props {
  isLoading?: boolean;
  title: string;
  value: string;
}

export default function StatCard({ isLoading, title, value }: Props) {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white px-4 py-5 shadow-sm dark:border-gray-900 dark:bg-gray-700 sm:p-6">
      <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-300">
        {title}
      </dt>
      {isLoading ? (
        <div className="mt-2 h-8 w-1/2 animate-pulse rounded bg-gray-300" />
      ) : (
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {value}
        </dd>
      )}
    </div>
  );
}
