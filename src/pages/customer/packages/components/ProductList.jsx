import ProductCard from "../../../../components/product/ProductCard";

const ProductList = ({ products }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            description={product.description}
            imageUrl={product.image}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
