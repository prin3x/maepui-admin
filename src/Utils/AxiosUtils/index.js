import axios from 'axios';
import getCookie from '../CustomFunctions/GetCookie';
import { jwtDecode } from 'jwt-decode';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PROD_URL,
  headers: {
    Accept: 'application/json',
  },
});

const request = async ({ ...options }, router) => {
  const auth = await verifyToken();
  console.log(auth)
  if (auth) {
    client.defaults.headers.common.Authorization = `Bearer ${auth}`;
  }
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status == 403 || error?.response?.status == 401) {
      // if login page do not push
      if (!window.location.pathname.includes('login') && !window.location.pathname.includes('register')) {
        router && router.push('/en/403');
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

const verifyToken = async () => {
  const authToken = getCookie('auth');

  if (!authToken) {
    return null;
  }
  // decode token
  const decodedToken = jwtDecode(authToken);

  if (decodedToken.role !== 'admin') {
    return null;
  }

  return authToken;
};

export default request;
