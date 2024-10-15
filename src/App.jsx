import { Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home";
import { Route, Routes } from "react-router-dom";
import LoginOrSignup from "./components/Pages/LoginOrSignup";
import Wishlist from "./components/Pages/Wishlist";
import Cart from "./components/Pages/Cart";
import { ToastContainer, toast } from "react-toastify";

import Account from "./components/Pages/Account";
import Profile from "./components/Profile/Profile";
import Setting from "./components/SettingSAcc/Setting";
import Addresses from "./components/Addresses/Addresses";
import Orders from "./components/Orders/Orders";
import Admin from "./components/Admin/Admin";
import ProductManage from "./components/Admin/Products Management/ProductManage";
import OrdersManage from "./components/Admin/Orders Management/OrdersManage";
import AddCategory from "./components/Admin/Add Categories/AddCategory";
import AddBrand from "./components/Admin/Add Brands/AddBrand";
import AddSubCategory from "./components/Admin/Add SubCategories/AddSubCategory";
import AddProduct from "./components/Admin/Add Products/AddProduct";
import SubCategories from "./components/SubCategories/SubCategories";
import AddImagesCategory from "./components/Admin/Add Images Category/AddImagesCategory";
import Product from "./components/Product/Product";
import ShowProduct from "./components/Show Product/ShowProduct";
import ForgetPassword from "./components/Forget Password/ForgetPassword";
// import { ToastContainer } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginOrSignup />} />
        <Route path="/login/*">
          <Route path="forgot-password" element={<ForgetPassword />} />
        </Route>

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/account" element={<Account />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/wishlist" element={<Wishlist />} />
        <Route path="/account/addresses" element={<Addresses />} />
        <Route path="/account/orders" element={<Orders />} />
        <Route path="/account/setting" element={<Setting />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*">
          <Route path="productManage" element={<ProductManage />} />
          <Route path="orderManage" element={<OrdersManage />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="addSubCategory" element={<AddSubCategory />} />
          <Route path="addBrand" element={<AddBrand />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="addImagesCategory" element={<AddImagesCategory />} />
        </Route>

        <Route path={"laptops"} element={<SubCategories />} />
        <Route path={"men's"} element={<SubCategories />} />
        <Route path={"women's"} element={<SubCategories />} />
        <Route path={"kids"} element={<SubCategories />} />
        <Route path={"mobiles"} element={<SubCategories />} />
        <Route path={"video-games"} element={<SubCategories />} />

        <Route path="product" element={<Product />} />

        <Route path="show-product" element={<ShowProduct />}>
          <Route path=":productId" element={<ShowProduct />} />
        </Route>
      </Routes>

      <ToastContainer />
    </Fragment>
  );
}

export default App;
