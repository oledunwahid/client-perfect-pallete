import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaMapMarkerAlt,
  FaUser,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import CartModal from "../../modals/CartModal";
import TrackOrderModal from "../../modals/TrackOrderModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold font-playfair">
              PERFECT <br />
              PALETTE
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItems toggleLoginModal={toggleLoginModal} />
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-navy hover:text-white hover:bg-navy focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItems mobile toggleLoginModal={toggleLoginModal} />
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <LoginModal closeModal={() => setIsLoginModalOpen(false)} />
      )}
    </nav>
  );
};

const NavItems = ({ mobile, toggleLoginModal }) => {
  const navigate = useNavigate();
  const baseClasses = mobile
    ? "text-navy hover:bg-navy hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    : "text-teal hover:text-navy transition duration-300 flex items-center";

  return (
    <>
      {!mobile && <CartModal />}
      {mobile && (
        <a href="#" className={baseClasses}>
          <FaShoppingBag className="mr-3 inline" />
          <span>Cart</span>
        </a>
      )}
      {!mobile && <TrackOrderModal />}
      {mobile && (
        <a href="#" className={baseClasses}>
          <FaMapMarkerAlt className="mr-3 inline" />
          <span>Track Order</span>
        </a>
      )}
      <button
        onClick={mobile ? () => navigate("/signin") : toggleLoginModal}
        className={`${baseClasses} ${
          mobile
            ? "w-full text-left"
            : "bg-skyblue text-navy px-4 py-2 rounded-md hover:bg-teal hover:text-white"
        }`}
      >
        <FaUser className={mobile ? "mr-3 inline" : "mr-2"} />
        <span>Sign in</span>
      </button>
      <button
        onClick={() => navigate("/register")}
        className={`${baseClasses} ${
          mobile
            ? "w-full text-left"
            : "bg-navy text-white px-4 py-2 rounded-md hover:bg-teal"
        }`}
      >
        <FaUserPlus className={mobile ? "mr-3 inline" : "mr-2"} />
        <span>Register</span>
      </button>
    </>
  );
};

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Simulasi panggilan API
      if (email === "user@example.com" && password === "password") {
        console.log("Login berhasil");
        closeModal();
        navigate("/dashboard");
      } else {
        throw new Error("Email atau password salah");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-navy bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-playfair text-navy">Sign In</h3>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-teal" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-teal placeholder-teal text-navy rounded-t-md focus:outline-none focus:ring-teal focus:border-teal focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-teal" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-teal placeholder-teal text-navy rounded-b-md focus:outline-none focus:ring-teal focus:border-teal focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-teal hover:text-navy focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-navy hover:bg-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-skyblue text-navy text-base font-medium rounded-md w-full shadow-sm hover:bg-teal hover:text-white focus:outline-none focus:ring-2 focus:ring-teal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
