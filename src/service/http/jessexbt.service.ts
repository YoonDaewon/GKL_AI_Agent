import type { JesseXbtServerResponse } from "@/domain/http.domain";
import axios from "axios";

import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const JESSEXBT_SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const jessexbt_instance = axios.create({
  baseURL: `${JESSEXBT_SERVER_URL}/api`,
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

jessexbt_instance.interceptors.request.use(
  requestPreHandler,
  requestErrorHandler,
);
jessexbt_instance.interceptors.response.use(
  responsePrehandler,
  responseErrorHandler,
);

const GET = async <T>(url: string, options?: AxiosRequestConfig) => {
  const optionsConfig = await OptionsGenerator(options);

  return jessexbt_instance
    .get<JesseXbtServerResponse<T>>(url, optionsConfig)
    .then((response) => {
      return response.data;
    });
};

const DELETE = async <T>(url: string, options?: AxiosRequestConfig) => {
  const optionsConfig = await OptionsGenerator(options);

  return jessexbt_instance
    .delete<JesseXbtServerResponse<T>>(url, optionsConfig)
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

  return jessexbt_instance
    .post<
      T,
      AxiosResponse<JesseXbtServerResponse<T>>,
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

  return jessexbt_instance
    .put<
      T,
      AxiosResponse<JesseXbtServerResponse<T>>,
      K
    >(url, data, optionsConfig)
    .then((response) => {
      return response.data;
    });
};

export const JessexbtService = {
  GET,
  POST,
  PUT,
  DELETE,
};
