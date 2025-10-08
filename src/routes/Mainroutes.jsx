import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import UnAuthWrapper from "./UnAuthWrapper";

const Products = lazy(() => import("../pages/Products"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const AuthWrapper = lazy(() => import("./AuthWrapper"));
const Cart = lazy(() => import("../pages/Cart"));

const Mainroutes = () => {
  // console.log(users);

  return (
    <Routes>
      <Route path="/" element={<Products />} />

      <Route
        path="/login"
        element={
          <UnAuthWrapper>
            <Login />
          </UnAuthWrapper>
        }
      />
      <Route
        path="/register"
        element={
          <UnAuthWrapper>
            <Register />
          </UnAuthWrapper>
        }
      />

      <Route
        path="/admin/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      />
      <Route
        path="/admin/user-profile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route
        path="/cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Mainroutes;
