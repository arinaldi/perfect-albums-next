import { FC } from 'react';
import useSWR from 'swr';

import { DISPATCH_TYPES, MESSAGES } from 'constants/index';
import { formatDate } from 'utils';
import { fetcher } from 'utils/api';
import { Method } from 'utils/types';
import useForm, { ReleaseInput } from 'hooks/useForm';
import useSubmit from 'hooks/useSubmit';
import { useApp } from 'components/Provider';
import Input from 'components/Input';
import CancelButton from 'components/CancelButton';
import SubmitButton from 'components/SubmitButton';

const EditReleaseModal: FC = () => {
  const [state, dispatch] = useApp();
  const { data, isOpen } = state.modal;
  const { mutate } = useSWR('/api/releases', fetcher);
  const { values, handleChange, resetForm } = useForm<ReleaseInput>({
    artist: data.artist,
    title: data.title,
    date: formatDate(data.date),
  });

  function handleClose() {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
    resetForm();
  }

  const options = {
    body: { ...values, id: data.id },
    callbacks: [mutate, handleClose],
    method: Method.put,
    path: '/api/releases',
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-11/12 lg:w-1/2 xl:w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-800">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t dark:border-black">
                  <h3 className="text-2xl font-semibold dark:text-white">Edit Release</h3>
                  <button
                    className="bg-transparent border-0 text-black text-2xl font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl outline-none focus:outline-none dark:text-white">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto">
                  <form method="POST" onSubmit={handleSubmit}>
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
                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b dark:border-black">
                      <CancelButton onClick={handleClose} />
                      <SubmitButton isSubmitting={isSubmitting} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

export default EditReleaseModal;
