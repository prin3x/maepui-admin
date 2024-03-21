import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useContext, useEffect } from 'react';
import FormBtn from '../../Elements/Buttons/FormBtn';
import request from '../../Utils/AxiosUtils';
import { blog, Category, tag } from '../../Utils/AxiosUtils/API';
import { dropDownScheme, nameSchema, YupObject } from '../../Utils/Validation/ValidationSchemas';
import CheckBoxField from '../InputFields/CheckBoxField';
import FileUploadField from '../InputFields/FileUploadField';
import MultiSelectField from '../InputFields/MultiSelectField';
import SimpleInputField from '../InputFields/SimpleInputField';
import I18NextContext from '@/Helper/I18NextContext';
import DescriptionInput from '../Product/DescriptionInput';
import { useTranslation } from '@/app/i18n/client';
import { getHelperText } from '../../Utils/CustomFunctions/getHelperText';
import { useRouter } from 'next/navigation';
import BlogSubmitFunction from './BlogSubmitFunction';
import { toast } from 'react-toastify';
import { DEFAULT_BUCKET } from '@/Utils/Constant/bucket';

const BlogForm = ({ updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data } = useQuery([Category], () => request({ url: Category, params: { type: 'BLOG' } }), {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });
  const { data: tagData } = useQuery([tag], () => request({ url: tag, params: { type: 'BLOG' } }), {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });
  const router = useRouter();

  const {
    data: oldData,
    isLoading: oldDataLoading,
    refetch,
  } = useQuery([blog + '/' + updateId], () => request({ url: `${blog}/${updateId}` }, router), {
    enabled: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && oldDataLoading) return null;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: updateId ? oldData?.data?.title || '' : '',
          description: updateId ? oldData?.data?.description || '' : '',
          content: updateId ? oldData?.data?.content || '' : '',
          meta_title: updateId ? oldData?.data?.meta_title || '' : '',
          meta_description: updateId ? oldData?.data?.meta_description || '' : '',
          blog_meta_image_id: updateId ? oldData?.data?.blog_meta_image?.id || '' : '',
          blog_meta_image: updateId ? oldData?.data?.blog_meta_image || '' : '',
          thumbnail_id: updateId ? oldData?.data?.thumbnail?.id || '' : undefined,
          thumbnail: updateId ? oldData?.data?.thumbnail || '' : '',
          categories: updateId ? oldData?.data?.categories.map((item) => item.id) || [] : [],
          tags: updateId ? oldData?.data?.tags.map((item) => item.id) || [] : [],
          status: updateId ? Boolean(oldData?.data?.status === 'ACTIVE') : true,
        }}
        validationSchema={YupObject({
          title: nameSchema,
          thumbnail_id: nameSchema,
          categories: dropDownScheme,
        })}
        onSubmit={async (values) => {
          try {
            const res = await BlogSubmitFunction(null, values, updateId);
            if (!updateId) {
              toast.success('สร้างบล็อกสำเร็จ');
            } else {
              toast.success('อัพเดทบล็อกสำเร็จ');
            }
            router.push(`/${i18Lang}/blog`);
          } catch (error) {
            toast.error('เกิดข้อผิดพลาด');
          }
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <>
            <Form id="blog" className="theme-form theme-form-2 mega-form">
              <SimpleInputField nameList={[{ name: 'title', placeholder: t('EnterBlogTitle'), require: 'true' }]} />
              <SimpleInputField nameList={[{ name: 'description', placeholder: t('EnterBlogDescription') }]} />
              <DescriptionInput values={values} setFieldValue={setFieldValue} title={'Content'} nameKey="content" />
              <FileUploadField
                name="thumbnail"
                title="Thumbnail"
                require="true"
                id="thumbnail"
                updateId={updateId}
                type="file"
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                helpertext={getHelperText('1500x700px')}
                bucket={DEFAULT_BUCKET}
                uploadType="BLOG"
              />
              <MultiSelectField
                errors={errors}
                values={values}
                setFieldValue={setFieldValue}
                name="categories"
                data={data}
                require="true"
              />
              <MultiSelectField
                errors={errors}
                values={values}
                setFieldValue={setFieldValue}
                name="tags"
                data={tagData}
              />
              <SimpleInputField
                nameList={[
                  { name: 'meta_title', placeholder: t('EnterMetaTitle') },
                  { name: 'meta_description', placeholder: t('EnterMetaDescription'), type: 'textarea' },
                ]}
              />
              <CheckBoxField name="status" />
              <FormBtn />
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default BlogForm;
