import { Approved, product } from '../../Utils/AxiosUtils/API';
import TableWarper from '../../Utils/HOC/TableWarper';
import ShowTable from '../Table/ShowTable';
import Loader from '../CommonComponent/Loader';
import usePermissionCheck from '../../Utils/Hooks/usePermissionCheck';
import { placeHolderImage } from '../../Data/CommonPath';
import AccountContext from '../../Helper/AccountContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const AllProductTable = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(['edit', 'destroy']);
  const { role, setRole } = useContext(AccountContext);
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole && storedRole !== 'undefined') {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }
  }, []);
  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    optionHead: { title: 'Action' },
    column: [
      { title: 'Image', apiKey: 'thumbnail', subKey: ['url'], type: 'image', placeHolderImage: placeHolderImage },
      { title: 'Name', apiKey: 'name', sorting: true, sortBy: 'desc' },
      { title: 'Price', apiKey: 'price', sorting: true, sortBy: 'desc' },
      { title: 'Stock Quantity', apiKey: 'stock_quantity', type: 'stock_quantity' },
      { title: 'Status', apiKey: 'status', type: 'switch' },
    ],
    data: data?.data || [],
  };
  headerObj?.data?.data?.map((element) => (element.price = element?.price));

  let pro = headerObj?.column?.filter((elem) => {
    return role == 'vendor' ? elem.title !== 'Approved' : elem;
  });
  headerObj.column = headerObj ? pro : [];
  if (!data) return <Loader />;
  return (
    <>
      <ShowTable {...props} headerData={headerObj} />
    </>
  );
};

export default TableWarper(AllProductTable);
