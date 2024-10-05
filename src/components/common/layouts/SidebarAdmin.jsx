import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import garden from "../../../assets/logo/garden-logo.png";

const SidebarAdmin = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const pages = [
    { path: "/admin/dashboard", icon: DashboardIcon, title: "Dashboard" },
    { path: "/admin/users", icon: UsersIcon, title: "Users" },
    { path: "/admin/packages", icon: PackagesIcon, title: "Packages" },
    { path: "/admin/orders", icon: OrdersIcon, title: "Orders" },
  ];

  function DashboardIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/admin/dashboard" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
      </svg>
    );
  }

  function UsersIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/admin/users" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5 6 6.34 6 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C16 14.17 11.33 13 9 13zm6-2h6v-2h-6v2zm-2-4h8V5h-8v2zm-2 8h4v-2h-4v2z" />
      </svg>
    );
  }

  function PackagesIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/admin/packages" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.16,8.26,13.24,4.3a3.35,3.35,0,0,0-3.12,0L3.2,8.26A3.33,3.33,0,0,0,1.5,11v8.72A3.33,3.33,0,0,0,3.2,23.38l6.92,3.95a3.35,3.35,0,0,0,3.12,0l6.92-3.95a3.33,3.33,0,0,0,1.7-2.66V11A3.33,3.33,0,0,0,20.16,8.26ZM12,6.27,17.62,9,12,11.73,6.38,9ZM6.38,12.15l4.62,2.73V21L6.38,18.27Zm11.24,6.12L13.5,21V14.88l4.62-2.73Z" />
      </svg>
    );
  }

  function OrdersIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 group-hover:text-teal-500 ${
          activePage === "/admin/orders" ? "text-teal-500" : "text-gray-500"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 11V5a4 4 0 10-8 0v6M5 11h14l1.38 8.42a2 2 0 01-1.98 2.33H5.6a2 2 0 01-1.98-2.33L5 11z"
        />
      </svg>
    );
  }

  const handlePageClick = (pagePath) => {
    setActivePage(pagePath);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 sm:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside
        id="default-sidebar"
        className={`fixed sm:relative left-0 z-20 sm:z-0 h-screen transition-transform ${
          isOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full sm:translate-x-0 sm:w-16"
        } bg-white `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto border right-full shadow-lg">
          <ul className="space-y-2 font-medium">
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  to={page.path}
                  className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group ${
                    activePage === page.path ? "font-bold bg-gray-200" : ""
                  }`}
                  onClick={() => handlePageClick(page.path)}
                >
                  <page.icon />
                  {isOpen && <span className="ms-3">{page.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center pt-10 md:text-lg">
            {/* {isOpen ? (
              <>
                <img src={garden} className="h-44 me-3" alt="Company Logo" />
              </>
            ) : (
              <img src={garden} className="h-8" alt="Company Logo" />
            )} */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
