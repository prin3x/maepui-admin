import React, { useContext, useEffect, useState } from 'react';
import { OrderAPI } from '../../../Utils/AxiosUtils/API';
import request from '../../../Utils/AxiosUtils';
import { useQuery } from '@tanstack/react-query';
import OrderNumberTable from './OrderNumberTable';
import { Col, Row } from 'reactstrap';
import Loader from '../../CommonComponent/Loader';
import OrderDetailsTable from './OrderDetailsTable';
import RightSidebar from './RightSidebar';
import { useTranslation } from '@/app/i18n/client';
import usePermissionCheck from '../../../Utils/Hooks/usePermissionCheck';
import I18NextContext from '@/Helper/I18NextContext';
import TrackingPanel from './TrackingPanel';

const orderStatusData = [
  { sequence: 1, slug: 'pending', name: 'Pending' },
  { sequence: 2, slug: 'shipped', name: 'Shipped' },
  { sequence: 3, slug: 'out-for-delivery', name: 'In Transit' },
  { sequence: 4, slug: 'delivered', name: 'Delivered' },
  { sequence: 5, slug: 'cancelled', name: 'Cancelled' },
];

const OrderDetailsContain = ({ updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [edit] = usePermissionCheck(['edit']);
  const [orderStatus, setOrderStatus] = useState('');

  // Getting Data from Order API for Order_Number
  const { data, isLoading, refetch } = useQuery(
    [`${OrderAPI}/${updateId}`],
    () => request({ url: `${OrderAPI}/${updateId}` }),
    {
      refetchOnWindowFocus: false,
      select: (res) => {
        return res.data;
      },
    },
  );

  useEffect(() => {
    if (data) {
      const orderStatusSelected = orderStatusData?.find((item) => item?.slug === data?.status?.toLowerCase());
      setOrderStatus(orderStatusSelected);
    }
  }, [isLoading, data]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Row>
      <Col xxl="9">
        <div className="mb-4">
          <div className="tracking-panel">
            <TrackingPanel orderStatusData={orderStatusData} orderStatus={orderStatus} />
          </div>
        </div>
        <Col sm="12">
          <OrderNumberTable
            moduleName={`${t('OrderNumber')}: #${data?.id}`}
            data={data}
            setOrderStatus={setOrderStatus}
            orderStatus={orderStatus}
            edit={edit}
          />
        </Col>
      </Col>
      {/* {data?.sub_orders?.length > 0 && (
        <Col sm="12">
          <OrderDetailsTable moduleName={`OrderDetails`} data={data} />
        </Col>
      )} */}
      <Col xxl="3">
        <RightSidebar data={data} />
      </Col>
    </Row>
  );
};

export default OrderDetailsContain;
