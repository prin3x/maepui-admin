import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import request from '@/Utils/AxiosUtils';
import { OrderAPI } from '@/Utils/AxiosUtils/API';
import { useTranslation } from '@/app/i18n/client';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody, Modal, ModalBody } from 'reactstrap';
import { useQueryClient } from '@tanstack/react-query';

const ConfirmPaymentDetails = ({ paymentData, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const queryClient = useQueryClient();
  const { t } = useTranslation(i18Lang, 'common');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modal, setModal] = useState(false);
  const { mutate: confirmPayment, isLoading } = useMutation(
    (payment) => request({ url: `/payments/approve-payment/${payment?.id}`, payment, method: 'post' }),
    {
      onSuccess: (resData) => {
        toast.success(t('PaymentConfirmed'));
        queryClient.invalidateQueries({ queryKey: [`${OrderAPI}/${updateId}`] });
      },
    },
  );

  const { mutate: rejectPayment, isLoading: rejectPaymentLoading } = useMutation(
    (payment) => request({ url: `/payments/reject-payment/${payment?.id}`, payment, method: 'post' }),
    {
      onSuccess: (resData) => {
        toast.success(t('PaymentRejected'));
        queryClient.invalidateQueries({ queryKey: [`${OrderAPI}/${updateId}`] });
      },
    },
  );

  const toggleModal = (payment) => {
    setSelectedPayment(payment);
    setModal(!modal);
  };

  const handleConfirmPayment = (payment) => {
    confirmPayment(payment);
  };

  const handleRejectPayment = () => {
    rejectPayment(payment);
  };

  return (
    <Card>
      {paymentData?.length > 0 &&
        paymentData?.map((payment) => (
          <CardBody>
            <div className="title-header">
              <div className="d-flex align-items-center">
                <h5>{t('Payment Slip')}</h5>
              </div>
            </div>
            <div className="customer-detail tracking-wrapper flex-column gap-4 align-items-center justify-content-center">
              <img
                onClick={() => toggleModal(payment)}
                className="img-fluid"
                width={200}
                src={payment?.payment_slip_url}
                alt="payment"
              />
              {payment?.status === 'PENDING' && (
                <div className="d-flex gap-2 mt-4">
                  <Btn
                    className="btn btn-outline"
                    label={t('Confirm Payment')}
                    onClick={() => handleConfirmPayment(payment)}
                    type="submit"
                    color="false"
                  >
                    <i className="fa fa-check"></i>
                    {t('Confirm Payment')}
                  </Btn>
                  <Btn className="btn-secondary" label={t('Cancel')} onClick={() => handleRejectPayment(payment)}>
                    <i className="fa fa-times"></i>
                    {t('Reject Payment')}
                  </Btn>
                </div>
              )}
            </div>
          </CardBody>
        ))}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <img className="img-fluid" src={selectedPayment?.payment_slip_url} alt="payment" />
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default ConfirmPaymentDetails;
