import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

interface ButtonProps {
  onClick: () => void;
}

export default function ClearButton({ onClick }: ButtonProps) {
  return (
    <Button
      className="absolute bottom-0 right-0 top-0 flex items-center justify-center p-2.5"
      variant="ghost"
    >
      <Cross2Icon onClick={onClick} />
    </Button>
  );
}
