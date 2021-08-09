import { FC } from 'react';
import useSWR from 'swr';

import { MESSAGES, METHODS } from 'constants/index';
import api, { fetcher } from 'utils/api';
import useForm, { SongInput } from 'hooks/useForm';
import useStore from 'hooks/useStore';
import Input from 'components/Input';
import Modal from 'components/Modal';

const CreateSongModal: FC = () => {
  const isOpen = useStore((state) => state.isOpen);
  const key = isOpen ? '/api/songs' : null;
  const { mutate } = useSWR(key, fetcher);
  const { values, handleChange, resetForm } = useForm<SongInput>({
    artist: '',
    title: '',
    link: '',
  });
  const options = {
    callbacks: [mutate],
    submitFn: async () => {
      await api('/api/songs', { body: values, method: METHODS.POST });
    },
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
