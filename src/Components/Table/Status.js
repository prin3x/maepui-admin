import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { RiQuestionLine } from 'react-icons/ri';
import { useTranslation } from '@/app/i18n/client';
import Btn from '../../Elements/Buttons/Btn';
import ShowModal from '../../Elements/Alerts&Modals/Modal';
import I18NextContext from '@/Helper/I18NextContext';

const Status = ({ data, disabled, apiKey, mutate, id }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    setStatus(Boolean(data.status === 'ACTIVE' ? true : false));
  }, [data, disabled]);

  const handleClick = (value) => {
    const status = value ? 'ACTIVE' : 'INACTIVE';
    mutate({id, status});
    setModal(false);
  };

  return (
    <>
      <FormGroup switch className="ps-0 form-switch form-check">
        <Label className="switch switch-sm" onClick={() => !disabled && setModal(true)}>
          <Input type="switch" disabled={disabled ? disabled : false} checked={status} />
          <span className={`switch-state ${disabled ? 'disabled' : ''}`}></span>
        </Label>
      </FormGroup>
      <ShowModal
        open={modal}
        close={false}
        setModal={setModal}
        buttons={
          <>
            <Btn title="No" onClick={() => setModal(false)} className="btn--no btn-md fw-bold" />
            <Btn title="Yes" onClick={() => handleClick(!status)} className="btn-theme btn-md fw-bold" />
          </>
        }
      >
        <div className="remove-box">
          <RiQuestionLine className="icon-box wo-bg" />
          <h5 className="modal-title">{t('Confirmation')}</h5>
          <p>{t('Areyousureyouwanttoproceed?')} </p>
        </div>
      </ShowModal>
    </>
  );
};

export default Status;
