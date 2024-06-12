import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function TopAlbumsLoading() {
  return (
    <AppLayout title="Top albums">
      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>
    </AppLayout>
  );
}
