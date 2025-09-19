import React, { useState } from "react";
import Logo from "../assets/Logo3.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900">
      <div className="flex justify-between items-center px-4 sm:px-10 py-5 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="h-12 w-auto sm:h-16" />
          <h1 className="hidden sm:block text-white text-2xl sm:text-4xl font-bold whitespace-nowrap">
            Excel AI Integration
          </h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-lg items-center text-white">
          <li
            className="list-none cursor-pointer hover:text-gray-400"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="list-none cursor-pointer hover:text-gray-400"
            onClick={() => navigate("/about")}
          >
            About us
          </li>
          <li
            className="list-none cursor-pointer hover:text-gray-400"
            onClick={() => navigate("/contact")}
          >
            Contact us
          </li>

          {/* Login Button */}
          {/*
           <li>
              <button
               className="bg-gray-500 text-white px-5 py-2 rounded-full hover:bg-gray-400"
               onClick={() => navigate("/login")}
               >
                Login
              </button>
            </li>
          */}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-800 px-4 py-4 space-y-4 text-white">
          <li
            className="list-none cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
          >
            Home
          </li>
          <li
            className="list-none cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/about");
              setMobileMenuOpen(false);
            }}
          >
            About us
          </li>
          <li
            className="list-none cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/contact");
              setMobileMenuOpen(false);
            }}
          >
            Contact us
          </li>

          {/* Login Button  */}
          {/*
          <li>
            <button
              className="bg-gray-500 w-full text-white px-5 py-2 rounded-full hover:bg-gray-400"
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
            >
              Login
            </button>
          </li>
          */}
        </nav>
      )}
    </header>
  );
}

export default Header;
