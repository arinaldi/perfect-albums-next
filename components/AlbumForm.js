import { useRouter } from 'next/router';

export default function AlbumForm({ isSubmitting, onChange, onSubmit, values }) {
  const router = useRouter();
  const { search } = router.query;

  return (
    <form method="POST" onSubmit={onSubmit}>
      <div className="bg-white p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-4">
            <div className="mb-4">
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
                onChange={onChange}
                required
                type="text"
                value={values.artist}
              />
            </div>
            <div className="mb-4">
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
                onChange={onChange}
                required
                type="text"
                value={values.title}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                Year
              </label>
              <input
                autoComplete="year"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                id="year"
                name="year"
                onChange={onChange}
                required
                type="text"
                value={values.year}
              />
            </div>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <fieldset className="mb-10">
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700">CD</p>
              </div>
              <div className="flex">
                <div className="flex items-center mr-4">
                  <input
                    checked={values.cd === false}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    id="cd_false"
                    name="cd"
                    onChange={onChange}
                    type="radio"
                    value="false"
                  />
                  <label
                    className="ml-3 block text-sm font-medium text-gray-700"
                    htmlFor="cd_false"
                  >
                    false
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={values.cd === true}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    id="cd_true"
                    name="cd"
                    onChange={onChange}
                    type="radio"
                    value="true"
                  />
                  <label
                    className="ml-3 block text-sm font-medium text-gray-700"
                    htmlFor="cd_true"
                  >
                    true
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset className="mb-10">
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700">Album of the Day</p>
              </div>
              <div className="flex">
                <div className="flex items-center mr-4">
                  <input
                    checked={values.aotd === false}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    id="aotd_false"
                    name="aotd"
                    onChange={onChange}
                    type="radio"
                    value="false"
                  />
                  <label
                    className="ml-3 block text-sm font-medium text-gray-700"
                    htmlFor="aotd_false"
                  >
                    false
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={values.aotd === true}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    id="aotd_true"
                    name="aotd"
                    onChange={onChange}
                    type="radio"
                    value="true"
                  />
                  <label
                    className="ml-3 block text-sm font-medium text-gray-700"
                    htmlFor="aotd_true"
                  >
                    true
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700">Favorite</p>
              </div>
              <div className="flex">
                <div className="flex items-center mr-4">
                  <input
                    checked={values.favorite === false}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    id="favorite_false"
                    name="favorite"
                    onChange={onChange}
                    type="radio"
                    value="false"
                  />
                  <label
                    className="ml-3 block text-sm font-medium text-gray-700"
                    htmlFor="favorite_false"
                  >
                    false
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={values.favorite === true}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    id="favorite_true"
                    name="favorite"
                    onChange={onChange}
                    type="radio"
                    value="true"
                  />
                  <label
                    className="ml-3 block text-sm font-medium text-gray-700"
                    htmlFor="favorite_true"
                  >
                    true
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end p-6">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
          onClick={() => {
            router.push({
              pathname: '/admin',
              query: { search },
            });
          }}
          style={{ transition: 'all .15s ease' }}
          type="button"
        >
          Cancel
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
  );
}
