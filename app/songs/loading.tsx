import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function FeaturedSongsLoading() {
  return (
    <AppLayout title="Featured Songs">
      <div className="flex justify-center mt-8">
        <Spinner className="h-10 w-10" />
      </div>
    </AppLayout>
  );
}
