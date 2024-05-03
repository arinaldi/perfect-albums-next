import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

interface ButtonProps {
  onClick: () => void;
}

export default function ClearButton({ onClick }: ButtonProps) {
  return (
    <div className="absolute right-0.5 top-0 flex h-full items-center">
      <Button className="size-8" onClick={onClick} size="icon" variant="ghost">
        <Cross2Icon />
      </Button>
    </div>
  );
}
