import { FC } from 'react';
import useSWR from 'swr';

import { DISPATCH_TYPES, MESSAGES } from 'constants/index';
import { fetcher } from 'utils/api';
import { Method } from 'utils/types';
import useSubmit from 'hooks/useSubmit';
import { useApp } from 'components/Provider';

const DeleteReleaseModal: FC = () => {
  const [state, dispatch] = useApp();
  const { mutate } = useSWR('/api/releases', fetcher);
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
    path: '/api/releases',
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-11/12 lg:w-1/2 xl:w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold">Delete Release</h3>
                  <button
                    className="bg-transparent border-0 text-black text-2xl font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto">
                  <div className="bg-white p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        Are you sure you want to delete {data.artist} &ndash;{' '}
                        {data.title}?
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      onClick={handleClose}
                      style={{ transition: 'all .15s ease' }}
                      type="button"
                    >
                      Close
                    </button>
                    <button
                      className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      style={{ minWidth: '135px', transition: 'all .15s ease' }}
                      type="submit"
                    >
                      {isSubmitting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
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

export default DeleteReleaseModal;
