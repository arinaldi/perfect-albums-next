import { useRouter } from 'next/router';

import { MESSAGES } from 'constants/index';
import useForm from 'hooks/useForm';
import useSubmit from 'hooks/useSubmit';
import useAdminAlbums from 'hooks/useAdminAlbums';
import CreateAlbum from 'components/CreateAlbum';

export default function CreateAlbumPage() {
  const router = useRouter();
  const { search } = router.query;
  const { mutate } = useAdminAlbums(`/api/albums?page=1&per_page=25&search=${search}&sort=&direction=`);
  const { values, handleChange } = useForm({
    artist: '',
    title: '',
    year: (new Date()).getFullYear().toString(),
    cd: false,
    aotd: false,
    favorite: false,
  });
  const options = {
    body: values,
    callbacks: [mutate, () => router.push({
      pathname: '/admin',
      query: { search },
    })],
    method: 'POST',
    path: '/api/albums',
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <CreateAlbum
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      values={values}
    />
  );
}
