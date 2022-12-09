import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function FeaturedSongsLoading() {
  return (
    <AppLayout title="Featured Songs">
      <div className="mt-8 flex justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    </AppLayout>
  );
}
