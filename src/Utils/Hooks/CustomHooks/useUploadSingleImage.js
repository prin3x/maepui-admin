import { useState } from 'react';
import request from '@/Utils/AxiosUtils';
const useUploadSingleImage = (bucket, uploadType) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const uploadImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('files', file);
    try {
      const { data } = await request({
        url: `/media/upload/${bucket}/${uploadType}`,
        method: 'POST',
        data: formData,
      });
      setImage(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { image, uploadImage, loading, error };
};

export default useUploadSingleImage;
