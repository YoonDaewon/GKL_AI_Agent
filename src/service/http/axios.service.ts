import axios from "axios";

import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const TWITTER_SERVER_URL = "";
const MEDIUM_SERVER_URL = "";

export const twitter_instance = axios.create({
  baseURL: TWITTER_SERVER_URL,
});
export const medium_instance = axios.create({
  baseURL: MEDIUM_SERVER_URL,
});

export const OptionsGenerator = (config?: AxiosRequestConfig) => {
  const requestconfig = config || {};

  const options = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
    timeout: 30000,
    ...requestconfig,
  };

  return options;
};

const responsePrehandler = (response: AxiosResponse) => {
  return response;
};

const responseErrorHandler = async (error: AxiosError) => {
  console.error(`[ERROR in responseErrorHandler]: ${error}`);

  return Promise.reject(error);
};

const requestPreHandler = (value: InternalAxiosRequestConfig) => {
  return value;
};

const requestErrorHandler = (error: AxiosError) => {
  return error;
};

twitter_instance.interceptors.request.use(
  requestPreHandler,
  requestErrorHandler,
);
twitter_instance.interceptors.response.use(
  responsePrehandler,
  responseErrorHandler,
);
