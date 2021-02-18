import { GraphQLClient } from 'graphql-request';

import { BASE_URL, DISPATCH_TYPES, MESSAGES, TOAST_TYPES } from '../constants';
import { getToken } from './storage';

export async function fetcher(...args) {
  return fetch(...args).then(res => res.json());
}

export function gqlFetcher(query, variables = {}) {
  const token = getToken();
  const client = new GraphQLClient(`${BASE_URL}/graphql`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return client.request(query, variables);
}

function logout(dispatch) {
  dispatch({
    type: DISPATCH_TYPES.SIGN_OUT_USER,
  });
  dispatch({
    payload: {
      message: MESSAGES.UNAUTHORIZED,
      type: TOAST_TYPES.ERROR,
    },
    type: DISPATCH_TYPES.OPEN_TOAST,
  });
}

async function handleResponse(response, dispatch) {
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

async function api(endpoint, options = {}) {
  const { body, dispatch, ...customConfig } = options;
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
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
