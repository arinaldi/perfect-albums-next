import { SearchIcon } from 'lucide-react';

export default function DataEmptyPlaceholder() {
  return (
    <div className="flex w-full items-center justify-center rounded-md border border-dashed p-6 sm:w-auto sm:min-w-80">
      <div className="mx-auto flex max-w-[400px] flex-col items-center justify-center text-center">
        <SearchIcon className="size-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No results found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Modify your search query
        </p>
      </div>
    </div>
  );
}
