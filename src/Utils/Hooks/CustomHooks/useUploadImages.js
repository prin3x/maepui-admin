import { useState } from 'react';
import request from '@/Utils/AxiosUtils';
const useUplaodImages = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImages = async (formData, bucket, uploadType) => {
    setUploading(true);
    try {
      const res = await request({
        url: `/media/upload/${bucket}/${uploadType}`,
        method: 'POST',
        data: formData,
      });
      setImages(res.data);
      setUploading(false);
    } catch (err) {
      setError(err);
      setUploading(false);
    }
  };

  return { images, uploading, error, uploadImages };
};

export default useUplaodImages;
