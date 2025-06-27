import Home from "../components/Home";
import Product from "../components/Product";
import Service from "../components/Service";
import About from "../components/About";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import ServiceDetails from "../components/ServiceDetails";
import ServiceUpdates from "../components/ServiceUpdates";

const Mainroutes = () => {
  return (
    <div className="p-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/detail/:name" element={<ProductDetails />} />

        <Route path="/service" element={<Service />}>
          <Route path="/service/detail" element={<ServiceDetails />} />
          <Route path="/service/update" element={<ServiceUpdates />} />
        </Route>

        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Mainroutes;
