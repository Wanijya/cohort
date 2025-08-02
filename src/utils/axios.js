import axios from "axios";

const instance = axios.create({
  baseURL: "https://fakestoreapi.com",
  // withCredentials: true, // Jub cookies are needed for cross-site requests
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    console.log("Request made with ", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log("Response received: ", response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
