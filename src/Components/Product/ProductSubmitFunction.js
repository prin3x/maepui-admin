import allPossibleCases from '../../Utils/CustomFunctions/AllPossibleCases';
import request from '../../Utils/AxiosUtils';
import { product } from '../../Utils/AxiosUtils/API';

const ProductSubmitFunction = async (_, value, updateId) => {
  value['is_sale_enable'] = Number(value['is_sale_enable']);
  value['is_random_related_products'] = Number(value['is_random_related_products']);
  value['is_free_shipping'] = Boolean(value['is_free_shipping']);
  value['is_approved'] = Number(value['is_approved']);
  value['is_featured'] = Number(value['is_featured']);
  value['safe_checkout'] = Number(value['safe_checkout']);
  value['secure_checkout'] = Number(value['secure_checkout']);
  value['social_share'] = Number(value['social_share']);
  value['encourage_order'] = Number(value['encourage_order']);
  value['encourage_view'] = Number(value['encourage_view']);
  value['is_trending'] = Number(value['is_trending']);
  value['is_return'] = Number(value['is_return']);
  value['thumbnail'] = value['thumbnail'];
  value['galleries'] = value['galleries'];

  value['status'] = Boolean(value['status']) ? 'ACTIVE' : 'INACTIVE';

  // submit data
  if (updateId) {
    return await request({
      url: `${product}/${updateId}`,
      method: 'patch',
      data: value,
    })
  } else {
    return await request({
      url: product,
      method: 'post',
      data: value,
    });
  }
};

export default ProductSubmitFunction;
