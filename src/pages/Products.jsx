import { lazy, Suspense, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteProducts from "../utils/useInfiniteProducts";
const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const Products = () => {
  const { products, hasMore, fetchProducts } = useInfiniteProducts(); // coustom hook

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
      }
    >
      <div className="p-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Suspense
            key={product.id}
            fallback={
              <h1 className="text-center text-red-500 text-5xl">Loading...</h1>
            }
          >
            <ProductTemplate product={product} />
          </Suspense>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Products;
