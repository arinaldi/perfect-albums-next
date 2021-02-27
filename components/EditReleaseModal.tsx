import { FC, FormEvent, useState } from 'react';
import useSWR from 'swr';
import { gql } from 'graphql-request';

import { DISPATCH_TYPES, MESSAGES, TOAST_TYPES } from 'constants/index';
import { formatDate } from 'utils';
import { gqlFetcher } from 'utils/api';
import { GET_RELEASES } from 'pages/new-releases';
import useForm, { ReleaseInput } from 'hooks/useForm';
import { useApp } from 'components/Provider';

export const EDIT_RELEASE = gql`
  mutation EditRelease(
    $id: ID!
    $artist: String!
    $title: String!
    $date: Date
  ) {
    editRelease(id: $id, artist: $artist, title: $title, date: $date) {
      id
      artist
      title
      date
    }
  }
`;

const EditReleaseModal: FC = () => {
  const [state, dispatch] = useApp();
  const { data, isOpen } = state.modal;
  const { mutate } = useSWR(GET_RELEASES, gqlFetcher);
  const { values, handleChange, resetForm } = useForm<ReleaseInput>({
    artist: data.artist,
    title: data.title,
    date: formatDate(data.date),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClose() {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
    resetForm();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await gqlFetcher(EDIT_RELEASE, { ...values, id: data.id });
      setIsSubmitting(false);
      mutate();
      dispatch({
        payload: {
          message: 'Release edited successfully',
          type: TOAST_TYPES.SUCCESS,
        },
        type: DISPATCH_TYPES.OPEN_TOAST,
      });
      handleClose();
    } catch (error) {
      setIsSubmitting(false);
      dispatch({
        payload: {
          message: MESSAGES.ERROR,
          type: TOAST_TYPES.ERROR,
        },
        type: DISPATCH_TYPES.OPEN_TOAST,
      });
    }
  }

  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-11/12 lg:w-1/2 xl:w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold">Edit Release</h3>
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
                  <form method="POST" onSubmit={handleSubmit}>
                    <div className="bg-white p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="artist"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Artist
                          </label>
                          <input
                            autoComplete="artist"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="artist"
                            name="artist"
                            onChange={handleChange}
                            required
                            type="text"
                            value={values.artist}
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <input
                            autoComplete="title"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            required
                            type="text"
                            value={values.title}
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Date
                          </label>
                          <input
                            autoComplete="date"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="date"
                            name="date"
                            onChange={handleChange}
                            required
                            type="date"
                            value={values.date}
                          />
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
                        className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50"
                        disabled={isSubmitting}
                        style={{
                          minWidth: '135px',
                          transition: 'all .15s ease',
                        }}
                        type="submit"
                      >
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
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