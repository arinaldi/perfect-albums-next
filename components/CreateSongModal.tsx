import { FC } from 'react';
import useSWR from 'swr';

import { MESSAGES } from 'constants/index';
import { fetcher } from 'utils/api';
import { Method } from 'utils/types';
import useForm, { SongInput } from 'hooks/useForm';
import Input from 'components/Input';
import Modal from 'components/Modal';

const CreateSongModal: FC = () => {
  const { mutate } = useSWR('/api/songs', fetcher);
  const { values, handleChange, resetForm } = useForm<SongInput>({
    artist: '',
    title: '',
    link: '',
  });
  const options = {
    body: values,
    callbacks: [mutate],
    method: Method.post,
    path: '/api/songs',
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  };

  return (
    <Modal options={options} resetForm={resetForm} title="Create Song">
      <div className="bg-white p-6 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <Input
              id="artist"
              onChange={handleChange}
              required
              type="text"
              value={values.artist}
            />
          </div>
          <div className="col-span-6">
            <Input
              id="title"
              onChange={handleChange}
              required
              type="text"
              value={values.title}
            />
          </div>
          <div className="col-span-6">
            <Input
              id="link"
              onChange={handleChange}
              required
              type="text"
              value={values.link}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSongModal;
