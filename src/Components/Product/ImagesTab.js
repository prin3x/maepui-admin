import React from 'react';
import FileUploadField from '../InputFields/FileUploadField';
import { getHelperText } from '../../Utils/CustomFunctions/getHelperText';
import { DEFAULT_BUCKET, UPLOAD_TYPE } from '@/Utils/Constant/bucket';

const ImagesTab = ({ values, setFieldValue, errors, updateId }) => {
  return (
    <>
      <FileUploadField
        errors={errors}
        name="thumbnail"
        id="thumbnail"
        title="Thumbnail"
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        updateId={updateId}
        bucket={DEFAULT_BUCKET}
        uploadType={UPLOAD_TYPE.PRODUCT}
        helpertext={getHelperText('600x600px')}
      />
      <FileUploadField
        errors={errors}
        name="galleries"
        id="galleries"
        title="Images"
        type="file"
        multiple={true}
        values={values}
        setFieldValue={setFieldValue}
        updateId={updateId}
        bucket={DEFAULT_BUCKET}
        uploadType={UPLOAD_TYPE.PRODUCT}
        helpertext={getHelperText('600x600px')}
      />
      {/* <FileUploadField errors={errors} name="sw ize_chart_image_id" id="size_chart_image_id" title="SizeChart" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} helpertext={'*Upload an image showcasing the size chart tailored for fashion products. A table format image is suggested for easy reference.'} /> */}
    </>
  );
};

export default ImagesTab;
