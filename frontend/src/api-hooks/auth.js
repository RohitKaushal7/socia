import { API_BASE_URL } from "../config/constants";

export const getAuthToken = async (email, password) => {
  const response = await fetch(API_BASE_URL + "/auth", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const token = await response.json();
  return token;
};

export const createAccount = async ({ email, password }) => {
  const response = await fetch(API_BASE_URL + "/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await response.json();
  return data;
};
