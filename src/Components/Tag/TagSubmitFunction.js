import { toast } from 'react-toastify';
import request from '../../Utils/AxiosUtils';
import { tag } from '../../Utils/AxiosUtils/API';

const TagSubmitFunction = (_, values, updateId) => {
  values['status'] = values['status'] === 1 ? 'ACTIVE' : 'INACTIVE';
  // submit data
  if (updateId) {
    request({
      url: `${tag}/${updateId}`,
      method: 'post',
      data: values,
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  } else {
    request({
      url: tag,
      method: 'post',
      data: values,
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
};

export default TagSubmitFunction;
