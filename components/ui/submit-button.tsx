import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      Submit
    </Button>
  );
}
