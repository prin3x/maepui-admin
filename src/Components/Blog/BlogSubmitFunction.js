import allPossibleCases from '../../Utils/CustomFunctions/AllPossibleCases';
import request from '@/Utils/AxiosUtils';
import { blog } from '@/Utils/AxiosUtils/API';

const BlogSubmitFunction = async (_, value, updateId) => {
  value.status = value.status ? 'ACTIVE' : 'INACTIVE';
  // submit data
  if (updateId) {
    return await request({
      url: `${blog}/${updateId}`,
      method: 'patch',
      data: value,
    });
  } else {
    return await request({
      url: blog,
      method: 'post',
      data: value,
    });
  }
};

export default BlogSubmitFunction;
