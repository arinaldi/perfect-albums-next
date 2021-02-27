import { Dispatch } from 'react';
import { GraphQLClient } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import { mutate } from 'swr';

import {
  BASE_URL,
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from 'constants/index';
import { getToken, removeToken } from 'utils/storage';
import { Action } from 'reducers/provider';

interface FetchError {
  info?: string;
  status?: number;
}

export async function fetcher(url: string): Promise<any> {
  const token = getToken();
  const headers = {
    Authorization: '',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${url}`, { headers });

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

export function gqlFetcher(query: RequestDocument, variables = {}): Promise<any> {
  const token = getToken();
  const client = new GraphQLClient(`${BASE_URL}/graphql`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return client.request(query, variables);
}

function logout(dispatch: Dispatch<Action>) {
  removeToken();
  dispatch({
    payload: {
      message: MESSAGES.UNAUTHORIZED,
      type: TOAST_TYPES.ERROR,
    },
    type: DISPATCH_TYPES.OPEN_TOAST,
  });
}

async function handleResponse(response: Response, dispatch: Dispatch<Action>) {
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

const defaultOptions = { body: null, dispatch: () => ({}) };

async function api(endpoint: string, options: Options = defaultOptions): Promise<ResponseObject> {
  const { body, dispatch, ...customConfig } = options;
  const token = getToken();
  const headers = {
    Authorization: '',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    body,
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response, dispatch);
}

export default api;
