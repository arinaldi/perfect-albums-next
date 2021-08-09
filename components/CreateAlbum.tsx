import { ChangeEvent, FC, FormEvent } from 'react';

import { AlbumInput } from 'utils/types';
import Layout from 'components/Layout';
import AlbumForm from 'components/AlbumForm';

interface Props {
  isSubmitting: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<Element>) => void;
  values: AlbumInput;
}

const CreateAlbum: FC<Props> = ({
  isSubmitting,
  onChange,
  onSubmit,
  values,
}) => {
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
};

export default CreateAlbum;
