import OrderApprovalDetails from '@/Components/Orders/Approval/OrderApprovalDetails';
import React from 'react';

const OrderApprovalPage = ({ params }) => {


  return (
    <div>
      {params.updateId ? (
        <OrderApprovalDetails orderId={params.updateId} />
      ) : (
        <div>Please select an order to approve.</div>
      )}
    </div>
  );
};

export default OrderApprovalPage;
