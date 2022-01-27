import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

import { ListItem } from 'utils';
import useAuthStore from 'hooks/useAuthStore';

interface Props {
  data: ListItem[];
  date: string;
  onDelete: (release: ListItem) => void;
  onEdit: (release: ListItem) => void;
}

export default function NewReleaseList({
  data,
  date,
  onDelete,
  onEdit,
}: Props) {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h4 className="text-xl font-semibold dark:text-white">{date}</h4>
      <ul data-testid={`list-${date}`} className="list-disc ml-6 p-1">
        {data.map((release) => (
          <li key={release.id} className="dark:text-white">
            <span>
              {release.artist} &ndash; {release.title}
            </span>
            {user && (
              <>
                <span
                  className="cursor-pointer ml-2 dark:text-white"
                  onClick={() => onEdit(release)}
                >
                  <PencilIcon className="inline w-4 h-4" />
                </span>
                <span
                  className="cursor-pointer ml-2 dark:text-white"
                  onClick={() => onDelete(release)}
                >
                  <TrashIcon className="inline w-4 h-4" />
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
