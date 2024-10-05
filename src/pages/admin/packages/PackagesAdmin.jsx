import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutAdmin";
import PackageList from "./sections/PackageList";

function PackagesAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Packages Page"
            message="Welcome to the Packages Page! Here you can manage all your packages efficiently. View package details, add new packages, update existing ones, and monitor inventory levels. Explore the various products included in each package and ensure everything is up-to-date. If you have any questions or need assistance, our support team is here to help!"
          />
        </div>
        <div className="px-4">
          <PackageList />
        </div>
      </main>
    </Layout>
  );
}

export default PackagesAdmin;
