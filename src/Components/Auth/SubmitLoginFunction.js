import request from '../../Utils/AxiosUtils';
import { login } from '../../Utils/AxiosUtils/API';
import Cookies from 'js-cookie';

const SubmitLoginFunction = async (values) => {
  try {
    const {data} = await request({
      url: login,
      method: 'post',
      data: values,
    });

    Cookies.set('auth', data.accessToken);
    Cookies.set('refresh', data.refreshToken);
  } catch (error) {
    console.log('error', error);
  }
};

export default SubmitLoginFunction;
