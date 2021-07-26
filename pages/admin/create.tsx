import { FC } from 'react';
import { useRouter } from 'next/router';

import { MESSAGES, METHODS, ROUTES_ADMIN } from 'constants/index';
import useForm, { AlbumInput } from 'hooks/useForm';
import useSubmit from 'hooks/useSubmit';
import CreateAlbum from 'components/CreateAlbum';

const CreateAlbumPage: FC = () => {
  const router = useRouter();
  const { values, handleChange } = useForm<AlbumInput>({
    artist: '',
    title: '',
    year: new Date().getFullYear().toString(),
    cd: false,
    aotd: false,
    favorite: false,
  });
  const options = {
    body: values,
    callbacks: [
      () =>
        router.push({
          pathname: ROUTES_ADMIN.base.href,
          query: router.query,
        }),
    ],
    method: METHODS.POST,
    path: '/api/albums',
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <CreateAlbum
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      values={values as AlbumInput}
    />
  );
};

export default CreateAlbumPage;
