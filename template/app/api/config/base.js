/* eslint-disable no-param-reassign */
import axios from "axios";
import credentials from "./credentials";
import { getSecureStore } from "../../constants/helper";
import url from "./index";

export const pricingApi = axios.create({
  baseURL: `${url.dev.pricing}${url.dev.version}`,
  headers: {
    Accept: "application/json",
  },
});
pricingApi.interceptors.request.use(
  config => {
    const xApiKey = getSecureStore("x-api-key")
      .then((response) => {
        config = {
          headers: {
            "x-api-key": response,
          },
        };
        return config;
      })
      .then((response) => response)
      .catch((err) => {
        console.log(err);
      });

    const sageHeaders = getSecureStore("sageToken")
      .then((response) => {
        xApiKey.config.headers.Authorization = response;
        return config;
      })
      .then((response) => response)
      .catch((err) => {
        console.log(err);
      });

    return sageHeaders;
  },
  error => Promise.reject(error),
);

export const pfeApi = axios.create({
  baseURL: `${url.dev.pfe}${url.dev.version}`,
  headers: {
    Accept: "application/json",
  },
});
pfeApi.interceptors.request.use(
  config => {
    const xApiKey = getSecureStore("x-api-key")
      .then((response) => {
        config = {
          headers: {
            "x-api-key": response,
          },
        };
        return config;
      })
      .then((response) => response)
      .catch((err) => {
        console.log(err);
      });

    const sageHeaders = getSecureStore("sageToken")
      .then((response) => {
        xApiKey.config.headers.Authorization = response;
        return config;
      })
      .then((response) => response)
      .catch((err) => {
        console.log(err);
      });

    return sageHeaders;
  },
  error => Promise.reject(error),
);

// export const ekycApi = axios.create({
//   baseURL: `${url.dev.pfe}${url.dev.version}`,
//   headers: {
//     Accept: "application/json",
//   },
// });
// ekycApi.interceptors.request.use(
//   config => {
//     const xApiKey = getSecureStore("x-api-key")
//       .then((response) => {
//         config = {
//           headers: {
//             "x-api-key": response,
//           }
//         }
//         return config;
//       })
//       .then((response) => response)
//       .catch((err) => {
//         console.log(err);
//       });

//     const sageHeaders = getSecureStore("sageToken")
//       .then((response) => {
//         xApiKey.config.headers.Authorization = response;
//         return config;
//       })
//       .then((response) => response)
//       .catch((err) => {
//         console.log(err);
//       });

//     return sageHeaders;
//   },
//   error => Promise.reject(error),
// );

export const ekycApi = axios.create({
  baseURL: `${url.dev.ekyc2}${url.dev.version}`,
  headers: {
    Accept: "application/json",
  },
});
ekycApi.interceptors.request.use(async (config) => {
  const sageToken = await getSecureStore("sage-token");
  const { xApiKey } = credentials.dev;
  const esbToken = await getSecureStore("x-esb-auth-token");
  config = {
    ...config,
    headers: {
      Authentication: sageToken,
      "x-api-key": xApiKey,
      "x-esb-auth-token": esbToken,
    },
  };
  // console.log(config);
  return config;
  // console.log(xApiKey);
});


export const submitEkycApi = axios.create({
  baseURL: `${url.dev.ekyc}${url.dev.version}`,
});
submitEkycApi.interceptors.request.use(
  config => {
    const xApiKey = getSecureStore("x-api-key")
      .then((response) => {
        config = {
          headers: {
            "x-api-key": response,
          },
        };
        return config;
      })
      .then((response) => response)
      .catch((err) => {
        console.log(err);
      });

    const sageHeaders = getSecureStore("sageToken")
      .then((response) => {
        xApiKey.config.headers.Authorization = response;
        return config;
      })
      .then((response) => response)
      .catch((err) => {
        console.log(err);
      });

    return sageHeaders;
  },
  error => Promise.reject(error),
);

export const onboardingApi = axios.create({
  baseURL: `${url.dev.onboarding}`,
  headers: {
    Accept: 'application/json',
    'x-api-key': credentials.dev.x_api_key,
  },
});
