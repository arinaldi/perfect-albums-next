'use client';
import Link from 'next/link';
import { PencilIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUser } from '@/components/UserProvider';

interface Props {
  year: string;
}

export default function RankingLink({ year }: Props) {
  const user = useUser();

  if (!user) return null;

  return (
    <Link href={`/albums/${year}`}>
      <Button size="icon" variant="outline">
        <PencilIcon className="size-4" />
      </Button>
    </Link>
  );
}
