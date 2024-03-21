import ProductStockReportTable from "./ProductStockReport/ProductStockReportTable"
import RecentOrderTable from "./RecentOrders/RecentOrderTable"
import TopDashSection from "./TopDashSection"

const MainDashboard = () => {
    return (
        <>
            {/* <TopDashSection /> */}
            <section>
                <RecentOrderTable />
                <ProductStockReportTable />
            </section >
        </>
    )
}

export default MainDashboard