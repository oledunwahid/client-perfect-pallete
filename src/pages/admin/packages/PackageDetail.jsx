import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import ProductCard from "./sections/ProductCard";
import DeleteModal from "../../../components/common/cards/DeleteModal";
import EditModal from "../../../components/common/cards/EditModal";
import AddModal from "../../../components/common/cards/AddModal";
import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutAdmin";

const PackageDetail = () => {
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isEditPackageModalOpen, setEditPackageModalOpen] = useState(false);
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchPackageDetails();
  }, [packageId]);
  const fetchPackageDetails = async () => {
    try {
      const response = await axiosInstance.get(`/packages/${packageId}`);

      setPackageData(response.data.data);
      setProducts(response.data.data.products);
    } catch (error) {
      console.error("Failed to fetch package details:", error);
      toast.error("Failed to fetch package details.");
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const productWithPackageId = { ...newProduct, packageId };

      const response = await axiosInstance.post(
        `/products`,
        productWithPackageId
      );
      fetchPackageDetails();
      setAddProductModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product.");
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const response = await axiosInstance.put(
        `/products/${updatedProduct.id}`,
        updatedProduct
      );
      fetchPackageDetails();
      setEditProductModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product.");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await axiosInstance.delete(
        `/products/${selectedProduct.id}`
      );
      fetchPackageDetails();
      setDeleteProductModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product.");
    }
  };

  if (!packageData)
    return (
      <>
        <Layout>
          <main className="flex flex-col gap-4 ">
            <div className="p-4">
              <DashboardBanner
                title="Packages Page"
                message="Welcome to the Packages Page! Here you can manage all your packages efficiently. View package details, add new packages, update existing ones, and monitor inventory levels. Explore the various products included in each package and ensure everything is up-to-date. If you have any questions or need assistance, our support team is here to help!"
              />
            </div>
            <div className="px-4">Loading...</div>{" "}
          </main>
        </Layout>
      </>
    );

  return (
    <>
      <Layout>
        <main className="flex flex-col gap-4 ">
          <div className="p-4">
            <DashboardBanner
              title="Packages Page"
              message="Welcome to the Packages Page! Here you can manage all your packages efficiently. View package details, add new packages, update existing ones, and monitor inventory levels. Explore the various products included in each package and ensure everything is up-to-date. If you have any questions or need assistance, our support team is here to help!"
            />
          </div>
          <div className="px-4 ">
            <h1 className="text-2xl font-bold mb-4">{packageData.title}</h1>
            <p>{packageData.description}</p>
            <p>Price: {packageData.price}</p>
            <p>Stock: {packageData.stock}</p>
            <button
              onClick={() => setEditPackageModalOpen(true)}
              className="mb-4 mr-4 mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit Package
            </button>
            <button
              onClick={() => setAddProductModalOpen(true)}
              className="mb-4 mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  productData={product}
                  onEdit={() => {
                    setSelectedProduct(product);
                    setEditProductModalOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedProduct(product);
                    setDeleteProductModalOpen(true);
                  }}
                />
              ))}
            </div>

            {/* Add Product Modal */}
            <AddModal
              isOpen={isAddProductModalOpen}
              onClose={() => setAddProductModalOpen(false)}
              onSubmit={handleAddProduct}
              fields={[
                {
                  name: "name",
                  label: "Product Name",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  required: true,
                },
                {
                  name: "image",
                  label: "Image URL",
                  type: "text",
                  required: true,
                },
              ]}
            />

            {/* Edit Product Modal */}
            <EditModal
              isOpen={isEditProductModalOpen}
              onClose={() => setEditProductModalOpen(false)}
              onSubmit={handleEditProduct}
              initialData={selectedProduct || {}}
              fields={[
                {
                  name: "name",
                  label: "Product Name",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  required: true,
                },
                {
                  name: "image",
                  label: "Image URL",
                  type: "text",
                  required: true,
                },
              ]}
            />

            {/* Edit Package Modal */}
            <EditModal
              isOpen={isEditPackageModalOpen}
              onClose={() => setEditPackageModalOpen(false)}
              onSubmit={async (updatedPackage) => {
                try {
                  const response = await axiosInstance.put(
                    `/packages/${packageId}`,
                    updatedPackage
                  );
                  fetchPackageDetails();
                  setEditPackageModalOpen(false);
                  toast.success(response.data.message);
                } catch (error) {
                  console.error("Failed to update package:", error);
                  toast.error("Failed to update package.");
                }
              }}
              initialData={packageData}
              fields={[
                {
                  name: "title",
                  label: "Package Title",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  required: true,
                },
                { name: "price", label: "Price", type: "text", required: true },
                {
                  name: "stock",
                  label: "Stock",
                  type: "number",
                  required: true,
                },
              ]}
            />

            {/* Delete Product Modal */}
            <DeleteModal
              isOpen={isDeleteProductModalOpen}
              onClose={() => setDeleteProductModalOpen(false)}
              onConfirm={handleDeleteProduct}
              itemName={selectedProduct?.name || "Product"}
            />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default PackageDetail;
