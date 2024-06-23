import SearchableSelectInput from '../../InputFields/SearchableSelectInput';

const UpdateStatus = ({ orderStatusData, setFieldValue, orderStatus }) => {
  const onStatusChange = (name, value) => {
    setFieldValue('order_status', value);
  };

  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            name: 'order_status',
            notitle: 'true',
            inputprops: {
              name: 'order_status',
              id: 'order_status',
              options: orderStatusData || [],
              value: orderStatus || '',
            },
            store: 'obj',
            setvalue: onStatusChange,
          },
        ]}
      />
    </>
  );
};

export default UpdateStatus;
