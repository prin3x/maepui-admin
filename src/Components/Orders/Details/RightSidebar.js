import React from 'react';
import InvoiceSummary from './InvoiceSummary';
import ConsumerDetails from './ConsumerDetails';
import ConfirmPaymentDetails from './ConfirmPaymentDetails';

const RightSidebar = ({ data }) => {
  return (
    <div className="sticky-top-sec">
      {data?.payments?.length > 0 && <ConfirmPaymentDetails paymentData={data?.payments} updateId={data?.id} />}
      <InvoiceSummary data={data} />
      <ConsumerDetails data={data} />
    </div>
  );
};

export default RightSidebar;
