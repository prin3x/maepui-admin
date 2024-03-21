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

    Cookies.set('access_token', data.access_token);
    Cookies.set('refresh_token', data.refresh_token);
  } catch (error) {
    console.log('error', error);
  }
};

export default SubmitLoginFunction;
