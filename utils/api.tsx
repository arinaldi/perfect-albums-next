import { FC } from 'react';
import { SWRConfig } from 'swr';
import { getAuth, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

import { MESSAGES, METHODS } from 'constants/index';

interface FetchError {
  info?: string;
  status?: number;
}

export async function fetcher(url: string): Promise<any> {
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

async function logout(errorMessage = MESSAGES.ERROR) {
  const auth = getAuth();

  try {
    await signOut(auth);
  } catch (error) {
    toast.error(errorMessage);
  }
}

async function handleResponse(response: Response) {
  const { status, url } = response;

  if (status === 401) {
    if (url.includes('signin')) {
      return Promise.reject(new Error(MESSAGES.SIGNIN));
    } else {
      await logout(MESSAGES.UNAUTHORIZED);
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
