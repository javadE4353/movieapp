import axios from "axios";

export const BASE_URL = "http://localhost:3500/api/v1";

export const axiospublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
});

