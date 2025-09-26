import type { MediumServerResponse } from "@/domain/http.domain";
import axios from "axios";

import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const MEDIUM_SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const medium_instance = axios.create({
  baseURL: `${MEDIUM_SERVER_URL}/api`,
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

medium_instance.interceptors.request.use(
  requestPreHandler,
  requestErrorHandler,
);
medium_instance.interceptors.response.use(
  responsePrehandler,
  responseErrorHandler,
);

const GET = async <T>(url: string, options?: AxiosRequestConfig) => {
  const optionsConfig = await OptionsGenerator(options);

  return medium_instance
    .get<MediumServerResponse<T>>(url, optionsConfig)
    .then((response) => {
      return response.data;
    });
};

const DELETE = async <T>(url: string, options?: AxiosRequestConfig) => {
  const optionsConfig = await OptionsGenerator(options);

  return medium_instance
    .delete<MediumServerResponse<T>>(url, optionsConfig)
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

  return medium_instance
    .post<
      T,
      AxiosResponse<MediumServerResponse<T>>,
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

  return medium_instance
    .put<T, AxiosResponse<MediumServerResponse<T>>, K>(url, data, optionsConfig)
    .then((response) => {
      return response.data;
    });
};

export const MediumService = {
  GET,
  POST,
  PUT,
  DELETE,
};
