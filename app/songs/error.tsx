'use client';

import ErrorMessage from 'components/ErrorMessage';
import { ErrorProps } from 'utils/types';

export default function FeaturedSongsError(props: ErrorProps) {
  return <ErrorMessage {...props} />;
}
