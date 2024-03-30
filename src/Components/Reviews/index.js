import TableWarper from '../../Utils/HOC/TableWarper'
import ShowTable from '../Table/ShowTable';
import Loader from '../CommonComponent/Loader';

const AllReviewsTable = ({ data, ...props }) => {
    const headerObj = {
        column: [
            { title: "Image", apiKey: "thumbnail", type: 'image', class: "sm-width" },
            { title: "CustomerName", apiKey: "consumer",  sortBy: "desc", subKey: ["name"] },
            { title: "ProductName", apiKey: "product", subKey: ["name"] },
            { title: "Rating", apiKey: "rating", type: "rating",sorting: false },
            { title: "CreateAt", apiKey: "created_at", sorting: false, sortBy: "desc", type: "date" },
        ],
        data: data || []
    };
    headerObj.data?.data?.map((element) => element.thumbnail = element?.product?.thumbnail)
    if (!data) return <Loader />;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWarper(AllReviewsTable)