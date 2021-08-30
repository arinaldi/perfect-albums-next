import { FC } from 'react';
import { mutate, SWRConfig } from 'swr';
import firebase from 'firebase/app';
import toast from 'react-hot-toast';

import { MESSAGES, METHODS } from 'constants/index';

interface FetchError {
  info?: string;
  status?: number;
}

async function fetcher(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const error: Error & FetchError = new Error(
      'An error occured while fetching the data.',
    );
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export function fetchAndCache(key: string): Promise<any> {
  const request = fetcher(key);
  mutate(key, request, false);
  return request;
}

function logout() {
  firebase
    .auth()
    .signOut()
    .catch((error: Error) => {
      console.error(error); // eslint-disable-line no-console
    });
}

async function handleResponse(response: Response) {
  const { status, url } = response;

  if (status === 401) {
    if (url.includes('signin')) {
      return Promise.reject(new Error(MESSAGES.SIGNIN));
    } else {
      toast.error(MESSAGES.UNAUTHORIZED);
      logout();
      return Promise.reject(new Error(MESSAGES.UNAUTHORIZED));
    }
  }

  const data = await response.json();

  if (response.ok) {
    return { data, status };
  } else {
    return Promise.reject(data);
  }
}

interface Options {
  body?: any;
  [key: string]: any;
}

type ResponseObject = {
  data: any;
  status: number;
};

const defaultOptions = {
  body: null,
  method: METHODS.GET,
};

export default async function api(
  endpoint: string,
  options: Options = defaultOptions,
): Promise<ResponseObject> {
  const { body, method, ...customConfig } = options;

  const config = {
    body,
    method,
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  return handleResponse(response);
}

export const SWRProvider: FC = ({ children }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
