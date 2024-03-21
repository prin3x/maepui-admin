import { placeHolderImage } from '../../../Data/CommonPath';
import TableWarper from '../../../Utils/HOC/TableWarper'
import ShowTable from '../../Table/ShowTable'

const ProductStockReport = ({ data, ...props }) => {
    const headerObj = {
        checkBox: false,
        isOption: true,
        noEdit: false,
        isSerialNo: false,
        noDelete: true,
        editRedirect: "product",
        optionHead: { title: "Action" },
        noCustomClass: true,
        column: [
            { title: 'image', apiKey: 'thumbnail', subKey: ['url'], type: 'image', placeholder: placeHolderImage },
            { title: 'name', apiKey: 'name' },
            { title: 'Quantity', apiKey: 'stock_quantity' },
            // { title: 'stock', apiKey: 'status', type: 'stock_status' },
        ],
        data: data?.data?.slice(0, 8) || []
    };
    return (
        <ShowTable {...props} headerData={headerObj} keyInPermission={"product"} />
    )
}

export default TableWarper(ProductStockReport)