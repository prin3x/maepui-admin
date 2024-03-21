import { useQuery } from '@tanstack/react-query';
import request from '../../Utils/AxiosUtils';
import { tax } from '../../Utils/AxiosUtils/API';
import CheckBoxField from '../InputFields/CheckBoxField';
import SearchableSelectInput from '../InputFields/SearchableSelectInput';
import SimpleInputField from '../InputFields/SimpleInputField';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';

const ShippingTaxTab = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data: taxData } = useQuery([tax], () => request({ url: tax, params: { status: 1 } }), {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });
  return (
    <>
      <CheckBoxField name="is_free_shipping" title="FreeShipping" />
      <SimpleInputField
        nameList={[
          { name: 'shipping_price', type: 'number', inputaddon: 'true', placeholder: t('EnterPrice'), require: 'true' },
        ]}
      />
    </>
  );
};

export default ShippingTaxTab;
