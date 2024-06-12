import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function ArtistsLoading() {
  return (
    <AppLayout title="Artists">
      <div className="mt-8 flex justify-center">
        <Spinner />
      </div>
    </AppLayout>
  );
}
