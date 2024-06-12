import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function FeaturedSongsLoading() {
  return (
    <AppLayout title="Featured songs">
      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>
    </AppLayout>
  );
}
