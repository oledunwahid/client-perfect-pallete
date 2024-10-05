import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/common/layouts/Navbar";
import Footer from "./components/common/layouts/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Product from "./pages/products/Home";
import LoginAdmin from "./pages/admin/auth/LoginAdmin";
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin";
import PrivateRoute from "./utils/PrivateRoute";
import UsersAdmin from "./pages/admin/users/UsersAdmin";
import PackagesAdmin from "./pages/admin/packages/PackagesAdmin";
import OrdersAdmin from "./pages/admin/orders/OrdersAdmin";
import PackageDetail from "./pages/admin/packages/PackageDetail";

function App() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/admin") && (
        <>
          <Navbar />
          <Footer />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/admin/login" element={<LoginAdmin />} />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <UsersAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/packages"
          element={
            <PrivateRoute>
              <PackagesAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute>
              <OrdersAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/packages/:packageId"
          element={
            <PrivateRoute>
              <PackageDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
