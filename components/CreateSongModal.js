import { useState } from 'react';
import useSWR from 'swr';
import { gql } from 'graphql-request';

import { DISPATCH_TYPES, MESSAGES, TOAST_TYPES } from '../constants';
import { gqlFetcher } from '../utils/api';
import { GET_SONGS } from '../pages/featured-songs';
import useForm from '../hooks/useForm';
import { useApp } from '../components/Provider';

const CREATE_SONG = gql`
  mutation CreateSong($artist: String!, $title: String!, $link: String!) {
    createSong(artist: $artist, title: $title, link: $link) {
      id
      artist
      title
      link
    }
  }
`;

export default function CreateSongModal() {
  const [state, dispatch] = useApp();
  const { mutate } = useSWR(GET_SONGS, gqlFetcher);
  const { values, handleChange, resetForm } = useForm({
    artist: '',
    title: '',
    link: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen } = state.modal;

  function handleClose() {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
    resetForm();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await gqlFetcher(CREATE_SONG, values);
      setIsSubmitting(false);
      mutate();
      dispatch({
        payload: {
          message: 'Song created successfully',
          type: TOAST_TYPES.SUCCESS,
        },
        type: DISPATCH_TYPES.OPEN_TOAST,
      });
      handleClose();
    } catch (error) {
      setIsSubmitting(false);
      dispatch({
        payload: {
          message: error.message || MESSAGES.ERROR,
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
                  <h3 className="text-2xl font-semibold">Create Song</h3>
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
                            htmlFor="link"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Link
                          </label>
                          <input
                            autoComplete="link"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="link"
                            name="link"
                            onChange={handleChange}
                            required
                            type="text"
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
}
