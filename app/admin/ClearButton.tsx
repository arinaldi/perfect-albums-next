import { X } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
}

export default function ClearButton({ onClick }: ButtonProps) {
  return (
    <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center">
      <X className="mr-1.5 size-6 cursor-pointer p-1" onClick={onClick} />
    </div>
  );
}
