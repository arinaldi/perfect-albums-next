import { Dispatch } from 'react';
import { mutate } from 'swr';
import firebase from 'firebase/app';

import {
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from 'constants/index';
import { Action } from 'reducers/provider';
import { Method } from 'utils/types';

interface FetchError {
  info?: string;
  status?: number;
}

export async function fetcher(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const error: Error & FetchError = new Error('An error occured while fetching the data.');
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

function logout(dispatch: Dispatch<Action> | undefined) {
  firebase
    .auth()
    .signOut()
    .catch((e) => {
      console.error(e); // eslint-disable-line no-console
    });

  if (dispatch) {
    dispatch({
      payload: {
        message: MESSAGES.UNAUTHORIZED,
        type: TOAST_TYPES.ERROR,
      },
      type: DISPATCH_TYPES.OPEN_TOAST,
    });
  }
}

async function handleResponse(response: Response, dispatch: Dispatch<Action> | undefined) {
  const { status, url } = response;

  if (status === 401) {
    if (url.includes('signin')) {
      return Promise.reject(new Error(MESSAGES.SIGNIN));
    } else {
      logout(dispatch);
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
  dispatch?: Dispatch<Action>;
  [key: string]: any;
}

type ResponseObject = {
  data: any;
  status: number;
};

const defaultOptions = {
  body: null,
  dispatch: undefined,
  method: Method.get,
};

async function api(endpoint: string, options: Options = defaultOptions): Promise<ResponseObject> {
  const {
    body,
    dispatch,
    method,
    ...customConfig
  } = options;

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
  return handleResponse(response, dispatch);
}

export default api;
