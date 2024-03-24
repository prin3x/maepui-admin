import axios from "axios";
import getCookie from "../CustomFunctions/GetCookie";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PROD_URL,
  headers: {
    Accept: "application/json",
  },
});

const request = async ({ ...options }, router) => {
  client.defaults.headers.common.Authorization = `Bearer ${getCookie("auth")}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status == 403 || error?.response?.status == 401) {
      // if login page do not push
      if(!window.location.pathname.includes('login')){
        router && router.push("/en/403")
      }
    }
    throw error;
  };
  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
