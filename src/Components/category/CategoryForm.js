import React, { useContext, useEffect, useMemo } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { Row } from 'reactstrap';
import request from '../../Utils/AxiosUtils';
import { nameSchema, YupObject } from '../../Utils/Validation/ValidationSchemas';
import SimpleInputField from '../InputFields/SimpleInputField';
import FileUploadField from '../InputFields/FileUploadField';
import FormBtn from '../../Elements/Buttons/FormBtn';
import CheckBoxField from '../InputFields/CheckBoxField';
import MultiSelectField from '../InputFields/MultiSelectField';
import Loader from '../CommonComponent/Loader';
import CategoryContext from '../../Helper/CategoryContext';
import { Category } from '../../Utils/AxiosUtils/API';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import CategorySubmitFunction from './CategorySubmitFunction';
import { toast } from 'react-toastify';
import { DEFAULT_BUCKET, UPLOAD_TYPE } from '@/Utils/Constant/bucket';

const CategoryForm = ({ setResetData, updateId, type }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const {
    data: oldData,
    isLoading,
    refetch,
  } = useQuery([Category, updateId], () => request({ url: `${Category}/${updateId}` }, router), {
    enabled: true,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  if (updateId && isLoading) return <Loader />;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || '' : '',
        description: updateId ? oldData?.data?.description || '' : '',
        thumbnail: updateId ? oldData?.data?.thumbnail : '',
        category_icon: updateId ? oldData?.data?.category_icon : '',
        commission_rate: updateId ? oldData?.data?.commission_rate : '',
        type: type,
        status: updateId ? Boolean(oldData?.data?.status === 'ACTIVE') : true,
        parent_id: updateId ? Number(oldData?.data?.parent_id) || undefined : undefined,
      }}
      validationSchema={YupObject({
        name: nameSchema,
      })}
      onSubmit={async (values) => {
        try {
          await CategorySubmitFunction(type, values, updateId);
          setResetData && setResetData(true);
          if (!updateId) {
            toast.success('สร้างหมวดหมู่สำเร็จ');
          } else {
            toast.success('อัพเดทหมวดหมู่สำเร็จ');
          }
          refetch();
          // router.push(`/${i18Lang}/category`);
        } catch (error) {
          console.error('error', error);
        }
      }}
    >
      {({ setFieldValue, values, errors }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            <SimpleInputField
              nameList={[
                { name: 'name', title: 'Name', placeholder: t('EnterCategoryName'), require: 'true' },
                { name: 'description', placeholder: t('EnterCategoryDescription') },
              ]}
            />
            <FileUploadField
              name="thumbnail"
              id="thumbnail"
              title="Image"
              updateId={updateId}
              type="file"
              values={values}
              setFieldValue={setFieldValue}
              bucket={DEFAULT_BUCKET}
              uploadType={UPLOAD_TYPE.CATEGORY}
            />
            <CheckBoxField name="status" />
            <FormBtn />
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default CategoryForm;
