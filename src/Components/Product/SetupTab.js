import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import request from '../../Utils/AxiosUtils';
import CheckBoxField from '../../Components/InputFields/CheckBoxField.js';
import { Category, product, tag } from '../../Utils/AxiosUtils/API';
import MultiSelectField from '../InputFields/MultiSelectField';
import { placeHolderImage } from '../../Data/CommonPath';
import SearchableSelectInput from '../InputFields/SearchableSelectInput';
import Loader from '../CommonComponent/Loader';

const SetupTab = ({ values, setFieldValue, errors, updateId }) => {
  const [search, setSearch] = useState(false);
  const [customSearch, setCustomSearch] = useState('');
  const [tc, setTc] = useState(null);

  // Getting Category Data with type products
  const { data: categoryData } = useQuery([Category], () => request({ url: Category, params: { type: 'PRODUCT' } }), {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  // Getting Tags Data with type products
  const { data: tagData } = useQuery([tag], () => request({ url: tag, params: { type: 'PRODUCT' } }), {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  // Added debouncing
  useEffect(() => {
    if (tc) clearTimeout(tc);
    setTc(setTimeout(() => setCustomSearch(search), 500));
  }, [search]);

  return (
    <>
      <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="tags" data={tagData} />
      <MultiSelectField
        errors={errors}
        values={values}
        setFieldValue={setFieldValue}
        name="categories"
        require="true"
        data={categoryData}
      />
      {/* {!values['is_random_related_products'] && (
        <SearchableSelectInput
          nameList={[
            {
              name: 'related_products',
              title: 'RelatedProducts',
              inputprops: {
                name: 'related_products',
                id: 'related_products',
                options: productData || [],
                setsearch: setSearch,
                helpertext: '*Choose a maximum of 6 products for effective related products display.',
              },
            },
          ]}
        />
      )} */}
    </>
  );
};

export default SetupTab;
