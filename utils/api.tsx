import toast from 'react-hot-toast';

import useAuthStore from 'hooks/useAuthStore';
import { MESSAGES, METHODS } from 'constants/index';

async function logout(errorMessage = MESSAGES.ERROR) {
  try {
    await useAuthStore.getState().signOut();
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
  const token = useAuthStore.getState().getSessionToken();

  const config = {
    body,
    method,
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...customConfig.headers,
    },
  };

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  return handleResponse(response);
}
