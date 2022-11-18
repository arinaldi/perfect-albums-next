import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function TopAlbumsLoading() {
  return (
    <AppLayout title="Top Albums">
      <div className="flex justify-center mt-8">
        <Spinner className="h-10 w-10" />
      </div>
    </AppLayout>
  );
}
