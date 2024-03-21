import request from '../../Utils/AxiosUtils';

const { CartItem } = require('@/Utils/AxiosUtils/API');

const CartItemUpdateFunction = (cartItemId, updateBody) => {
  return await request({
    url: CartItem + '/' + cartItemId,
    method: 'patch',
    data: updateBody,
  });
};

export default CartItemUpdateFunction;
