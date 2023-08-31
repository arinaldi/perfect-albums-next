import { Cross2Icon } from '@radix-ui/react-icons';

interface ButtonProps {
  onClick: () => void;
}

export default function ClearButton({ onClick }: ButtonProps) {
  return (
    <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center">
      <span className="mr-1.5 h-6 w-6 cursor-pointer rounded-full p-1 transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900">
        <Cross2Icon onClick={onClick} />
      </span>
    </div>
  );
}
