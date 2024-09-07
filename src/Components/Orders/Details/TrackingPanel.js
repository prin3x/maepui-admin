import ShowModal from '@/Elements/Alerts&Modals/Modal';
import Btn from '@/Elements/Buttons/Btn';
import request from '@/Utils/AxiosUtils';
import { OrderAPI } from '@/Utils/AxiosUtils/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const TrackingPanel = ({ orderData, orderStatusData, orderStatus }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { mutate, isLoading } = useMutation(
    (data) => request({ url: `${OrderAPI}/${orderData?.id}/status`, data, method: 'patch' }),
    {
      onSuccess: (resData) => {
        toast.success(resData?.message);
        queryClient.invalidateQueries({ queryKey: [`${OrderAPI}/${orderData.id}`] });
        setModal(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error?.message);
      },
    },
  );

  const handleModal = (status) => {
    setSelectedStatus(status.slug);
    setModal(!modal);
  };

  const changeStatus = () => {
    if (selectedStatus) {
      const updateStatus = selectedStatus.toUpperCase();
      mutate({ status: updateStatus });
      setSelectedStatus(null);
    }
  };
  return (
    <ul>
      {orderStatusData?.map((elem, index) => (
        <li
          role="button"
          className={
            (elem?.sequence >= orderStatus?.sequence && orderStatus?.slug === 'cancelled') || elem?.slug === 'cancelled'
              ? 'd-none'
              : elem?.sequence <= orderStatus?.sequence
              ? 'active'
              : ''
          }
          key={index}
          onClick={() => handleModal(elem)}
        >
          <div className="panel-content">
            <div className="icon">
              <Image
                className="img-fluid"
                src={`/assets/images/tracking/${elem.slug}.svg`}
                alt="tracking status"
                height={40}
                width={40}
              />
            </div>
            <div className="status">{elem?.name}</div>
          </div>
        </li>
      ))}
      {orderStatus?.slug === 'cancelled' && (
        <li className="active cancelled-box">
          <div className="panel-content">
            <div className="icon">
              <Image src={`/assets/images/tracking/${orderStatus.slug}.svg`} alt="image" height={40} width={40} />
            </div>
            <div className="status">{orderStatus?.name}</div>
          </div>
        </li>
      )}
      <ShowModal title="Change Status" open={modal} onClick={() => setModal(true)} setModal={setModal}>
        <div>
          <p>Are you sure you want to change the status?</p>
          <div className="d-flex justify-content-end gap-2">
            <Btn className="btn btn-outline" onClick={() => changeStatus()}>
              Yes
            </Btn>
            <Btn className="btn-secondary" onClick={() => setModal(false)}>
              No
            </Btn>
          </div>
        </div>
      </ShowModal>
    </ul>
  );
};

export default TrackingPanel;
