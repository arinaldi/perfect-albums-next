import AppLayout from 'components/AppLayout';
import Spinner from 'components/Spinner';

export default function NewReleasesLoading() {
  return (
    <AppLayout title="New Releases">
      <div className="mt-8 flex justify-center">
        <Spinner />
      </div>
    </AppLayout>
  );
}
