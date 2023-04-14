import { loginApi, loginAuthApi, passwordApi } from "./base";

export function login(payload) {
  return loginApi.post("/login", payload);
}

export function loginValidate(payload) {
  return loginAuthApi.post("/login-device/validate", payload);
}

export function loginDevice() {
  return loginAuthApi.get("/login-device");
}

export function passwordCheck(payload) {
  return passwordApi.put("/password/check", payload);
}

export function logout(payload) {
  return loginAuthApi.post("/logout", payload);
}
