import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start A Search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobDekho</span>
        </a>

        {/* nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* signup & login btn */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {userLoggedIn ? (
            <div>
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/");
                  });
                }}
                className="py-2 px-5 border rounded bg-blue text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="py-2 px-5 border border-r-4 shadow rounded"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="py-2 px-5 border rounded bg-blue text-white"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* mobile menu/view */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* navitems for mobile */}
      <div
        className={`px-4 bg-gray-600 py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          {userLoggedIn ? (
            <div>
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/");
                  });
                }}
                className="text-white py-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <li className="text-white py-1">
                <Link to="/login">Log in</Link>
              </li>
              <li className="text-white py-1">
                <Link to="/sign-up">Sign up</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
