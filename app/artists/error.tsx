'use client';

import ErrorMessage from 'components/ErrorMessage';
import { ErrorProps } from 'utils/types';

export default function ArtistsError(props: ErrorProps) {
  return <ErrorMessage {...props} />;
}
