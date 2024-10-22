import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TableProduct from "./components/TableProduct";
import DetailProduct from "./pages/product/DetailProduct";
import ChangeProduct from "./pages/product/ChangeProduct";
import DataSupplier from "./components/TableSupplier";
import DetailSupplier from "./pages/supplier/DetailSupplier";
import ChangeSupplier from "./pages/supplier/ChangeSupplier";
import AllProducts from "./pages/AllProducts";
import Login from "./auth/Login";
import AuthAdmin from "./auth/AuthAdmin";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/table" element={<TableProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/data-supplier" element={<DataSupplier />} />
          <Route path="/detail-supplier/:id" element={<DetailSupplier />} />
          <Route path="/detail/:id" element={<DetailProduct />} />

          <Route element={<AuthAdmin />}>
            <Route path="/edit/:id" element={<ChangeProduct />} />
            <Route path="/edit-supplier/:id" element={<ChangeSupplier />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
