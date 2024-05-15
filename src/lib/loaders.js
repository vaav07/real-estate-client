import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest.get("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];

  const postPromise = await apiRequest.get("/posts?" + query);
  return defer({
    postMessage: postPromise,
  });
};

export const profilePageLoader = async ({ request, params }) => {
  const postPromise = await apiRequest.get("/users/profilePosts");
  const chatPromise = await apiRequest.get("/chats");
  return defer({
    postMessage: postPromise,
    chatResponse: chatPromise,
  });
};
