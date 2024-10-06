import { FaShoppingCart } from "react-icons/fa";
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../features/cart/cartSlice";
import { toast } from "react-toastify";

const PackageList = ({ packageData }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.User);

  const handleAddToCart = () => {
    if (Array.isArray(user)) {
      toast.error("Please log in to add items to your cart!"); // Show toast if not logged in
      return;
    }
    dispatch(addToCart(packageData));
    toast(`${packageData.title} telah ditambahkan ke cart!`);
  };

  return (
    <section className="bg-beige py-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy mb-2 font-playfair text-center">
          {packageData.title}
        </h1>

        <p className="text-center text-lg text-gray-700 font-playfair mb-3">
          {packageData.description}
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <ProductList products={packageData.products} />
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-navy text-white px-4 py-2 rounded-md hover:bg-teal transition duration-300 flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageList;
