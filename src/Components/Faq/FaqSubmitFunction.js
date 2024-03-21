import { FaqAPI } from '@/Utils/AxiosUtils/API';

const { default: request } = require('@/Utils/AxiosUtils');

const submitFaq = async (values, updateId) => {
  if (updateId) {
    // Update Logic
    const response = await request({ url: `${FaqAPI}/${updateId}`, method: 'PATCH', data: values });

    return response;
  } else {
    // Add Logic
    const response = await request({ url: `${FaqAPI}`, method: 'POST', data: values });

    return response;
  }
};

export default submitFaq;
