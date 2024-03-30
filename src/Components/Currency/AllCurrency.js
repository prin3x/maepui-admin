import React from 'react'
import TableWarper from '../../Utils/HOC/TableWarper';
import ShowTable from '../Table/ShowTable';
import usePermissionCheck from '../../Utils/Hooks/usePermissionCheck';

const AllCurrency = ({ data, ...props }) => {
    const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
    const headerObj = {
        checkBox: true,
        isOption: edit == false && destroy == false ? false : true,
        noEdit: edit ? false : true,
        optionHead: { title: "Action" },
        column: [
            { title: "Code", apiKey: "code", sorting: false, sortBy: "desc" },
            { title: "Symbol", apiKey: "symbol", sorting: false, sortBy: "desc" },
            { title: "ExchangeRate", apiKey: "exchange_rate", sorting: false, sortBy: "desc" },
            { title: "CreateAt", apiKey: "created_at", sorting: false, sortBy: "desc", type: "date" },
            { title: "Status", apiKey: "status", type: "switch" }
        ],
        data: data || []
    };
    if (!data) return null;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWarper(AllCurrency)