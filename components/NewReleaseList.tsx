import { FC } from 'react';

import { ICONS } from 'constants/index';
import { ListItem } from 'utils';
import { useAppState } from 'components/Provider';

interface Props {
  data: ListItem[];
  date: string;
  onDelete: (release: ListItem) => void;
  onEdit: (release: ListItem) => void;
}

const NewReleaseList: FC<Props> = ({ data, date, onDelete, onEdit }) => {
  const {
    isLoading,
    user: { isAuthenticated },
  } = useAppState();

  return (
    <div>
      <h4 className="text-xl font-semibold">{date}</h4>
      <ul data-testid={`list-${date}`} className="list-disc ml-6 p-1">
        {data.map(release => (
          <li key={release.id}>
            <span>
              {release.artist} &ndash; {release.title}
            </span>
            {isAuthenticated && !isLoading && (
              <>
                <span
                  className="align-middle cursor-pointer ml-2"
                  onClick={() => onEdit(release)}
                >
                  {ICONS.PENCIL}
                </span>
                <span
                  className="align-middle cursor-pointer"
                  onClick={() => onDelete(release)}
                >
                  {ICONS.X}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewReleaseList;
