import request from '@/Utils/AxiosUtils';
import { attachment } from '@/Utils/AxiosUtils/API';

export const AttachmentActionFunction = async (values) => {
  const { id } = values;

  if (id) {
    return await request({ url: `${attachment}/${id}`, method: 'delete' });
  }
};

export const BulkAttachmentActionFunction = async (values) => {
  const { ids } = values;

  if (ids.length > 0) {
    return await request({ url: `${attachment}/bulk-delete`, method: 'post', data: { ids } });
  }
};
