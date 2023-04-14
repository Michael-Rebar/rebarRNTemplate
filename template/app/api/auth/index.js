/* eslint-disable import/prefer-default-export */
import { otpAuthApi, tokenApi } from "./base";

/**
 *
 * @param {*} payload
 * Sample payload data
 * {
    "clientId": "c8420000-74c5-11eb-954c-a784186a337c"
    "clientSecret": "9e973b70-74c6-11eb-9503-1104cc6d8128"
    "grantType": "client_credentials"
  }
 * @returns
 * Sample return data
 * {
    "status": 201,
    "message": "created",
    "result": {
      "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiI5ZTk3M2I3MC03NGM2LTExZWItOTUwMy0xMTA0Y2M2ZDgxMjgiLCJncmFudFR5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJ1cGRhdGVkIjoiMjAyMS0wMi0yMlQxMjoyNDowMSswODowMCIsImNyZWF0ZWQiOiIyMDIxLTAyLTIyVDEyOjI0OjAxKzA4OjAwIiwic2NvcGUiOlsiVEJEIl0sImRlc2NyaXB0aW9uIjoiU2luZ2xpZmUgUEggTWVzc2FnaW5nIFNlcnZpY2UgU3RhY2siLCJpZCI6ImM4NDIwMDAwLTc0YzUtMTFlYi05NTRjLWE3ODQxODZhMzM3YyIsIm5hbWUiOiJNZW93dGgiLCJpYXQiOjE2MzA5MTkwNzUsImV4cCI6MTYzMDkyMjY3NX0.sVcWK-fwn04CzIND0vO4fozH3P1Eeg0Nvau-YLIJL5gpTzyf9LBzv0ezrXoFsxMoHWgdtikgKT8iblUo6P5BiA"
    }
  }
 */
export function getAccessToken(payload) {
  return otpAuthApi.post(`auth/tokens`, payload);
}

export function getCustomerToken(payload) {
  return tokenApi.post(`token`, new URLSearchParams({
    client_id: payload.client_id,
    grant_type: payload.grant_type,
    client_secret: payload.client_secret,
    redirect_uri: payload.redirect_uri,
    code: payload.code,
  }));
}

export function getRefreshToken(payload) {
  return tokenApi.post(`token`, new URLSearchParams({
    client_id: payload.client_id,
    grant_type: payload.grant_type,
    client_secret: payload.client_secret,
    refresh_token: payload.refresh_token,
  }));
}
