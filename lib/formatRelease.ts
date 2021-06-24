import { Release as ReleaseType, ReleaseData } from 'utils/types';

export default function formatRelease(data: ReleaseData): ReleaseType {
  const {
    _id,
    artist,
    date,
    title,
  } = data.toObject();

  return {
    artist,
    date: date ? date.toISOString() : null,
    id: _id.toString(),
    title,
  };
}
