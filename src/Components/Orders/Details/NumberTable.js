import React, { useContext } from 'react';
import { Table } from 'reactstrap';
import Avatar from '../../CommonComponent/Avatar';
import SettingContext from '../../../Helper/SettingContext';
import { placeHolderImage } from '../../../Data/CommonPath';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const NumberTable = ({ data }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);

  return (
    <div className="tracking-wrapper table-responsive">
      <Table className="product-table">
        <thead>
          <tr>
            <th scope="col">{t('Image')}</th>
            <th scope="col">{t('Name')}</th>
            <th scope="col">{t('Price')}</th>
            <th scope="col">{t('Quantity')}</th>
            <th scope="col">{t('Subtotal')}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((elem, index) => (
            <tr key={index}>
              <td className="product-image">
                <Avatar
                  customeClass={'img-fluid'}
                  data={elem?.product?.thumbnail}
                  placeHolder={placeHolderImage}
                  name={elem?.product?.name}
                />
              </td>
              <td>
                <h6>{elem?.product?.name}</h6>
              </td>
              <td>
                <h6>{convertCurrency(elem?.price)}</h6>
              </td>
              <td>
                <h6>{elem?.quantity}</h6>
              </td>
              <td>
                <h6>{convertCurrency(elem?.subtotal)}</h6>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NumberTable;
