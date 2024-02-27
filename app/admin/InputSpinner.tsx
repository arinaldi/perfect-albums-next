import { Loader2 } from 'lucide-react';

export default function InputSpinner() {
  return (
    <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center">
      <Loader2 className="mr-1.5 size-6 animate-spin cursor-none p-1" />
    </div>
  );
}
