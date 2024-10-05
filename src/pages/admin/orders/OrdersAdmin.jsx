import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutAdmin";
import OrderList from "./sections/OrderList";

function OrdersAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Orders Page"
            message="Welcome to the Orders Page! Here you can manage and track all customer orders. Review order details, update statuses, and ensure timely delivery. Monitor order history and customer interactions to enhance their experience. If you have any questions or need assistance, our support team is here to help!"
          />
        </div>
        <div className="px-4">
          <OrderList />
        </div>
      </main>
    </Layout>
  );
}

export default OrdersAdmin;
