import { Link2OffIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="m-5 flex items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center rounded-md border border-dashed p-6 text-center sm:w-auto sm:min-w-[400px]">
        <Link2OffIcon className="size-10 text-muted-foreground" />
        <h1 className="mt-4 text-4xl font-semibold">404</h1>
        <p className="mt-2 text-base text-muted-foreground">Page not found</p>
      </div>
    </div>
  );
}
