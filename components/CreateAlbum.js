import Layout from 'components/Layout';
import AlbumForm from 'components/AlbumForm';

export default function CreateAlbum({ isSubmitting, onChange, onSubmit, values }) {
  return (
    <Layout title="Create Album">
      <AlbumForm
        isSubmitting={isSubmitting}
        onChange={onChange}
        onSubmit={onSubmit}
        values={values}
      />
    </Layout>
  );
}
