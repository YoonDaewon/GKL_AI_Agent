import type { TwitterServerResponse } from "@/domain/http.domain";
import axios from "axios";

import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const TWITTER_SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const twitter_instance = axios.create({
  baseURL: `${TWITTER_SERVER_URL}/api/v1/tweet-crawler`,
});

export const OptionsGenerator = (config?: AxiosRequestConfig) => {
  const requestconfig = config || {};

  const options = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
    timeout: 100000,
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

const GET = async <T>(url: string, options?: AxiosRequestConfig) => {
  const optionsConfig = await OptionsGenerator(options);

  return twitter_instance
    .get<TwitterServerResponse<T>>(url, optionsConfig)
    .then((response) => {
      return response.data;
    });
};

const DELETE = async <T>(url: string, options?: AxiosRequestConfig) => {
  const optionsConfig = await OptionsGenerator(options);

  return twitter_instance
    .delete<TwitterServerResponse<T>>(url, optionsConfig)
    .then((response) => {
      return response.data;
    });
};

const POST = async <T, K>(
  url: string,
  data?: K,
  options?: AxiosRequestConfig,
) => {
  const optionsConfig = await OptionsGenerator(options);

  return twitter_instance
    .post<
      T,
      AxiosResponse<TwitterServerResponse<T>>,
      K
    >(url, data, optionsConfig)
    .then((response) => {
      return response.data;
    });
};

const PUT = async <T, K>(
  url: string,
  data?: K,
  options?: AxiosRequestConfig,
) => {
  const optionsConfig = await OptionsGenerator(options);

  return twitter_instance
    .put<
      T,
      AxiosResponse<TwitterServerResponse<T>>,
      K
    >(url, data, optionsConfig)
    .then((response) => {
      return response.data;
    });
};

export const TwitterService = {
  GET,
  POST,
  PUT,
  DELETE,
};
