import { Button } from 'components/ui/button';
import { ErrorProps } from 'utils/types';

export default function ErrorMessage({ error, reset }: ErrorProps) {
  return (
    <div className="mt-4 flex justify-center">
      <div className="text-center">
        <p>{error.message ?? 'Something went wrong'}</p>
        <Button className="mt-4" onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
}
