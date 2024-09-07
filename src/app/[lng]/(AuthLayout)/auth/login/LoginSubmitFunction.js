import request from '@/Utils/AxiosUtils';
import { signinAPI } from '@/Utils/AxiosUtils/API';
import Cookies from 'js-cookie';

export const loginSubmitFunction = async (values) => {
  try {
    const response = await request({ url: signinAPI, method: 'POST', data: values });
    Cookies.set('auth', response?.data?.accessToken, { expires: 7 });
    Cookies.set('refresh', response?.data?.refreshToken, { expires: 7 });
    return response;
  } catch (error) {
    throw error;
  }
};
