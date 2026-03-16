import { api } from "../api/apiconfig";

export async function registerUser(userdata) {
  const response = await api.post("auth/register", {
    name: userdata.name,
    email: userdata.email,
    password: userdata.password,
    userType: userdata.userType,
  });
  return response.data;
}

export async function loginUser(userdata) {
  const response = await api.post("auth/login", {
    email: userdata.email,
    password: userdata.password,
  });
  return response.data;
}

export async function logoutUser() {
  const response = await api.post("auth/logout");
  return response.data;
}

export async function getMe() {
  const response = await api.get("auth/me");
  return response.data;
}

// UI --> page
// HOOK -->
// State
// service (API)
