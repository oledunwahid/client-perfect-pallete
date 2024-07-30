import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <div className="text-2xl font-bold">PERFECT PALETTE</div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Cart
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Track Your Order
        </a>
        <button
          onClick={() => navigate("/signin")}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Sign in
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
