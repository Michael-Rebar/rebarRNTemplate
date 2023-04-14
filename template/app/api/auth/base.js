/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios from "axios";
import url from "../config/index";

/**
 * Start of OTP Auth API
 */
export const otpAuthApi = axios.create({
  baseURL: `${url.dev.otp_auth}${url.dev.version}`,
  headers: {
    Accept: "application/json",
  },
});
/**
 * End of OTP Auth API
 */

/**
 * Start of Customer Token API
 */
export const tokenApi = axios.create({
  baseURL: `${url.dev.tokens}/`,
  headers: {
    contentType: "application/x-www-form-urlencoded",
  },
});
/**
 * End of Customer Token API
 */
