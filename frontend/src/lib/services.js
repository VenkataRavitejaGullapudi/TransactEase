import axios from "axios";
import { getAuthToken, storeAuthToken } from "./utils";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST || "http://localhost:3000";

export async function getUsersByFilter(filter) {
  const response = await axios.get(
    `${BACKEND_HOST}/api/v1/user/bulk?filter=${filter}`,
    {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );
  return response;
}

export async function signIn(userName, password) {
  const response = await axios.post(`${BACKEND_HOST}/api/v1/user/signin`, {
    userName,
    password,
  });
  if (response.status === 200 && response?.data?.token)
    storeAuthToken(response.data.token, userName);
  return response;
}

export async function signUp({ firstName, lastName, userName, password }) {
  const response = await axios.post(`${BACKEND_HOST}/api/v1/user/signup`, {
    firstName,
    lastName,
    userName,
    password,
  });
  if (response.status === 201 && response?.data?.token)
    storeAuthToken(response.data.token, userName);
  return response;
}

export async function transferMoney(to, amount) {
  const response = await axios.post(
    `${BACKEND_HOST}/api/v1/account/transfer`,
    {
      to,
      amount: parseFloat(amount),
    },
    {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );
  return response;
}

export async function me() {
  const response = await axios.get(`${BACKEND_HOST}/api/v1/user/me`, {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  return response;
}

export async function getBalance() {
  const response = await axios.get(`${BACKEND_HOST}/api/v1/account/balance`, {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  return response;
}
