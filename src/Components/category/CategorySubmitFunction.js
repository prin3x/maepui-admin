import { toast } from 'react-toastify';
import request from '../../Utils/AxiosUtils';
import { Category } from '../../Utils/AxiosUtils/API';

const CategorySubmitFunction = async (categoryType, values, updateId) => {
  values['type'] = categoryType || 'PRODUCT';
  values['status'] = Boolean(values['status']) ? 'ACTIVE' : 'INACTIVE';
  // submit data
  if (updateId) {
    return await request({
      url: `${Category}/${updateId}`,
      method: 'patch',
      data: values,
    });
  } else {
    return await request({
      url: Category,
      method: 'post',
      data: values,
    });
  }
};

export default CategorySubmitFunction;
