'use client';

import ErrorMessage from 'components/ErrorMessage';
import { ErrorProps } from 'utils/types';

export default function TopAlbumsError(props: ErrorProps) {
  return <ErrorMessage {...props} />;
}
