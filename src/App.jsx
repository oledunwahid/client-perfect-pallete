import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/layouts/Navbar";
import Footer from "./components/common/layouts/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Product from "./pages/products/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
