/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { getSecureStore } from "../../constants/helper";
import credentials from "../config/credentials";
import url from "../config/index";

/**
 * Start Login API
 */
export const loginApi = axios.create({
  baseURL: `${url.dev.login}${url.dev.version}`,
  headers: {
    Accept: "application/json",
    "x-api-key": credentials.dev.x_api_key,
  },
});

export const loginAuthApi = axios.create({
  baseURL: `${url.dev.login}${url.dev.version}`,
  headers: {
    Accept: "application/json",
    "x-api-key": credentials.dev.x_api_key,
  },
});
loginAuthApi.interceptors.request.use(async (config) => {
  try {
    const tokens = await getSecureStore("singlifeTokens");
    const parseToken = JSON.parse(tokens);

    config = {
      ...config,
      headers: {
        ...config.headers,
        Authentication: parseToken.sage_token,
      },
    };

    return config;
  } catch (error) {
    console.log(error); // For bug tracking
    return false;
  }
});

export const passwordApi = axios.create({
  baseURL: `${url.dev.login}${url.dev.version}`,
  headers: {
    Accept: "application/json",
  },
});
passwordApi.interceptors.request.use(async (config) => {
  try {
    const tokens = await getSecureStore("singlifeTokens");
    const parseToken = JSON.parse(tokens);

    config = {
      ...config,
      headers: {
        ...config.headers,
        Authentication: parseToken.sage_token,
        "x-api-key": credentials.dev.x_api_key,
      },
    };

    return config;
  } catch (error) {
    console.log(error); // For bug tracking
    return error;
  }
});
/**
 * End of Login API
 */
