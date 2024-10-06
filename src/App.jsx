import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/common/layouts/Navbar";
import Footer from "./components/common/layouts/Footer";
import Home from "./pages/customer/home/Home";
import Login from "./pages/customer/auth/Login";
import LoginAdmin from "./pages/admin/auth/LoginAdmin";
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin";
import PrivateRoute from "./utils/PrivateRoute";
import UsersAdmin from "./pages/admin/users/UsersAdmin";
import PackagesAdmin from "./pages/admin/packages/PackagesAdmin";
import OrdersAdmin from "./pages/admin/orders/OrdersAdmin";
import PackageDetail from "./pages/admin/packages/PackageDetail";
import { useEffect } from "react";
import { fetchUserDetail } from "./hooks/useFetchUserDetail";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/users/user";
import RegisterCustomer from "./pages/customer/auth/RegisterCustomer";
import LoginCustomer from "./pages/customer/auth/LoginCustomer";
import PackagesCustomer from "./pages/customer/packages/PackagesCustomer";
import CheckoutCustomer from "./pages/customer/orders/CheckoutCustomer";
import OrdersInformation from "./pages/customer/orders/OrdersInformation";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.User);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && user.length === 0) {
      const fetchUser = async () => {
        try {
          const userData = await fetchUserDetail(token);
          dispatch(setUser(userData.data));
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };

      fetchUser();
    }
  }, [dispatch, user]);
  return (
    <>
      {!location.pathname.startsWith("/admin") && (
        <>
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<PackagesCustomer />} />
        <Route path="/signin-test" element={<Login />} />
        <Route path="/signin" element={<LoginCustomer />} />
        <Route path="/signup" element={<RegisterCustomer />} />
        <Route path="/checkout" element={<CheckoutCustomer />} />
        <Route path="/orders" element={<OrdersInformation />} />
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
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default App;
