import { FC } from 'react';
import useSWR from 'swr';

import { MESSAGES } from 'constants/index';
import { fetcher } from 'utils/api';
import { Method } from 'utils/types';
import useForm, { ReleaseInput } from 'hooks/useForm';
import Input from 'components/Input';
import Modal from 'components/Modal';

const CreateReleaseModal: FC = () => {
  const { mutate } = useSWR('/api/releases', fetcher);
  const { values, handleChange, resetForm } = useForm<ReleaseInput>({
    artist: '',
    title: '',
    date: '',
  });
  const options = {
    body: values,
    callbacks: [mutate],
    method: Method.post,
    path: '/api/releases',
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };

  return (
    <Modal options={options} resetForm={resetForm} title="Create Release">
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
              id="date"
              onChange={handleChange}
              type="date"
              value={values.date}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateReleaseModal;
