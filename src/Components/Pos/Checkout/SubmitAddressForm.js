const { default: request } = require('@/Utils/AxiosUtils');

const submitAddress = async (addressData, addressId = null) => {
  try {
    const method = addressId ? 'put' : 'post';
    const url = addressId ? `/address/${addressId}` : `/address/user/${addressData.user_id}`;

    const response = await request({
      method: method,
      url: url,
      data: addressData,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error('Failed to process address', response);
      return null;
    }
  } catch (error) {
    console.error('Error processing address', error);
    return null;
  }
};
export default submitAddress;
