'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useUser } from '@/components/UserProvider';

export default function EditButton() {
  const user = useUser();

  if (!user) return null;

  return (
    <Link href="/albums/all-time/edit">
      <Button>Edit</Button>
    </Link>
  );
}
