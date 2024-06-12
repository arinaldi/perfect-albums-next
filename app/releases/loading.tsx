import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function NewReleasesLoading() {
  return (
    <AppLayout title="New releases">
      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>
    </AppLayout>
  );
}
