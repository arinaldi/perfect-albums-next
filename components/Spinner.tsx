import { Loader2 } from 'lucide-react';

import { cn } from 'lib/utils';

interface Props {
  className?: string;
}

export default function Spinner({ className = 'size-6' }: Props) {
  return <Loader2 className={cn('animate-spin', className)} />;
}
