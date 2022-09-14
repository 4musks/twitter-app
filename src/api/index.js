import axios from "axios";

import { TWITTER_APP_TOKEN } from "../utils/config";

const getHeaders = () => ({
  "x-access-token": localStorage.getItem(TWITTER_APP_TOKEN) || "",
});

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 60000,
});

const Exception = (message) => {
  const error = new Error(message);

  error.success = false;

  return error;
};

const processError = (error) => {
  if (error?.response?.data) {
    // client received an error response (5xx, 4xx)

    throw Exception(error?.response?.data?.message);
  }

  if (error?.request) {
    // client never received a response, or request never left
    throw Exception("It's not you, it's us, want to give it another try?");
  }

  // anything else
  throw Exception("Oops! Something went wrong.");
};

export const login = async (payload) => {
  try {
    const response = await API.post("/login", payload);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getTweets = async (params) => {
  try {
    const response = await API.get("/tweet", { params, headers: getHeaders() });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const createTweet = async (payload) => {
  try {
    const response = await API.post("/tweet", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const deleteTweet = async (params) => {
  try {
    const response = await API.delete("/tweet", {
      params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};
