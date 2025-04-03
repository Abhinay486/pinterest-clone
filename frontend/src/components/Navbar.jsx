import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div className="bg-white shadow-sm">
      {/* Navbar container with padding */}
      <div className="flex justify-between items-center px-6 py-3 md:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/145/145808.png"
            alt="Pinterest Logo"
            className="h-6 md:h-8"
          />
          <span className="text-red-600 text-xl font-bold">Pinterest</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link className="text-gray-700 hover:text-gray-900 text-sm md:text-base" to="/">
            Home
          </Link>
          <Link className="text-gray-700 hover:text-gray-900 text-sm md:text-base" to="/create">
            Create
          </Link>
          <Link
            className="w-9 h-9 md:w-10 md:h-10 rounded-full font-semibold text-xl bg-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900"
            to="/account"
          >
            {user.name[0]}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
