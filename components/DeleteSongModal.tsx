import { FC } from 'react';
import useSWR from 'swr';

import { DISPATCH_TYPES, MESSAGES } from 'constants/index';
import { fetcher } from 'utils/api';
import { Method } from 'utils/types';
import useSubmit from 'hooks/useSubmit';
import { useApp } from 'components/Provider';
import CancelButton from 'components/CancelButton';
import SubmitButton from 'components/SubmitButton';

const DeleteSongModal: FC = () => {
  const [state, dispatch] = useApp();
  const { mutate } = useSWR('/api/songs', fetcher);
  const { data, isOpen } = state.modal;

  function handleClose() {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
  }

  const options = {
    body: { id: data.id },
    callbacks: [mutate, handleClose],
    method: Method.delete,
    path: '/api/songs',
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
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
                  <h3 className="text-2xl font-semibold dark:text-white">Delete Song</h3>
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
                  <div className="bg-white p-6 dark:bg-gray-800">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 dark:text-white">
                        Are you sure you want to delete {data.artist} &ndash;{' '}
                        {data.title}?
                      </div>
                    </div>
                  </div>
                  <form
                    className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b dark:border-black"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <CancelButton onClick={handleClose} />
                    <SubmitButton isSubmitting={isSubmitting} />
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

export default DeleteSongModal;
