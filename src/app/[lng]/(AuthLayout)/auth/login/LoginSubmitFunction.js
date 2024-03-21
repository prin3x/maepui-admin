import request from '@/Utils/AxiosUtils';
import { signinAPI } from '@/Utils/AxiosUtils/API';
import Cookies from 'js-cookie';

export const loginSubmitFunction = async (values) => {
  try {
    const response = await request({ url: signinAPI, method: 'POST', data: values });
    Cookies.set('auth', response?.data?.access_token, { expires: 7 });
    Cookies.set('refresh', response?.data?.refresh_token, { expires: 7 });
    return response;
  } catch (error) {
    return error;
  }
};
