import { DECADES, ICONS } from 'constants/index';
import { formatFavorites, sortDesc } from 'utils';
import Layout from 'components/Layout';

function AlbumCol({ data, year, total }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 id={year} className="text-xl font-semibold">
          {year}
        </h4>
        <div className="px-2 py-1 mr-4 rounded-md bg-gray-100 text-xl font-semibold">
          {total.toLocaleString()}
        </div>
      </div>
      <ul data-testid={`list-${year}`} className="list-disc ml-6 p-1">
        {data.map((album, index) => (
          <li key={index}>
            {album.artist} &ndash; {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TopAlbums({ data, onChange, value }) {
  const Title = (
    <>
      Top Albums
      <span className="ml-3 p-1 rounded-md bg-gray-100 text-xl sm:text-2xl font-semibold">
        {data.favorites.length.toLocaleString()}
      </span>
    </>
  );

  const DecadeSelect = (
    <select
      className="py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      name="decade"
      onChange={onChange}
      value={value}
    >
      <option disabled value="label">
        Jump to decade
      </option>
      {DECADES.map(({ label, link }) => (
        <option key={label} value={link}>
          {label}
        </option>
      ))}
    </select>
  );

  return (
    <Layout title={Title} titleAction={DecadeSelect}>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {Object.entries(formatFavorites(data.favorites))
          .sort(sortDesc)
          .map(([year, favorites]) => (
            <AlbumCol
              key={year}
              data={favorites}
              year={year}
              total={favorites.length}
            />
          ))}
      </div>
      <a className="fixed bottom-0 right-0 p-5 text-gray-500" href="#top">
        {`${ICONS.UP} Top`}
      </a>
    </Layout>
  );
}
