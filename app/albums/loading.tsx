import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function TopAlbumsLoading() {
  return (
    <AppLayout title="Top Albums">
      <div className="mt-8 flex justify-center">
        <Spinner />
      </div>
    </AppLayout>
  );
}
