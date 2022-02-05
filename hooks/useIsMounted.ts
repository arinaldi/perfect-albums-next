import { useEffect, useState } from 'react';

export default function useIsMounted() {
  const [isMounted, set] = useState(false);

  useEffect(() => {
    set(true);
  }, []);

  return isMounted;
}
