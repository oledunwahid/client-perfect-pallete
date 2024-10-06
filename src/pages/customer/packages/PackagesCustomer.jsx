import useFetchPackages from "../../../hooks/useFetchPackages";
import PackageList from "./sections/PackageList";
import { FaSpinner } from "react-icons/fa";

function PackagesCustomer() {
  const { packages, loading, error } = useFetchPackages();

  return (
    <div className="pt-16">
      {/* <h1 className="text-3xl font-bold text-center mb-8">Daftar Paket</h1> */}
      {loading && (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-3xl" />
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {packages.map((packageItem, index) => (
        <PackageList key={index} packageData={packageItem} />
      ))}
    </div>
  );
}

export default PackagesCustomer;
