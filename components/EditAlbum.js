import Layout from 'components/Layout';
import AlbumForm from 'components/AlbumForm';

export default function EditAlbum({ isSubmitting, onChange, onSubmit, values }) {
  return (
    <Layout title="Edit Album">
      <AlbumForm
        isSubmitting={isSubmitting}
        onChange={onChange}
        onSubmit={onSubmit}
        values={values}
      />
    </Layout>
  );
}
