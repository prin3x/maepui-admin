import React, { useContext, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useTranslation } from '@/app/i18n/client';
import ShowModal from '../../Elements/Alerts&Modals/Modal';
import Btn from '../../Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import request from '@/Utils/AxiosUtils';
import { toast } from 'react-toastify';

const TableDeleteOption = ({ isCheck, url, refetch }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState(false);

  const handleDelete = async (deleteIds) => {
    try {
      await request({
        url: `${url}/bulk-delete`,
        method: 'post',
        data: { ids: deleteIds },
      });
      toast.success('Deleted Successfully');
      refetch();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <>
      <a className="align-items-center btn btn-outline btn-sm d-flex" onClick={() => setModal(true)}>
        <RiDeleteBinLine /> {t('Delete')}
      </a>
      <ShowModal
        open={modal}
        close={false}
        setModal={setModal}
        buttons={
          <>
            <Btn
              title="No"
              onClick={() => {
                setModal(false);
              }}
              className="btn--no btn-md fw-bold"
            />
            <Btn
              title="Yes"
              className="btn-theme btn-md fw-bold"
              onClick={async () => {
                await handleDelete(isCheck);
              }}
            />
          </>
        }
      >
        <div className="remove-box">
          <RiDeleteBinLine className="icon-box" />
          <h2>{t('DeleteItem')}?</h2>
          <p>{t('ThisItemWillBeDeletedPermanently') + ' ' + t("YouCan'tUndoThisAction!!")} </p>
        </div>
      </ShowModal>
    </>
  );
};

export default TableDeleteOption;
