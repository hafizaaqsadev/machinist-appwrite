import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo2.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md px-4 sm:px-6 py-3">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-14">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Machinist Logo"
            className="w-32 sm:w-40 md:w-48 h-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link
            to="/"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Services
          </Link>
          <Link
            to="/cleaning"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Cleaning
          </Link>
          <Link
            to="/personal-care"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Personal Care
          </Link>
          <Link
            to="/info"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Info
          </Link>
          <Link
            to="/areas"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Areas
          </Link>

          {/* Login / Signup */}

          <Link
            to="/login"
            className="ml-3 px-4 py-1.5 bg-blue-800 text-white text-sm rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1.5 bg-blue-800 text-white text-sm rounded-full hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 px-4 pb-4">
          <Link
            to="/"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Services
          </Link>
          <Link
            to="/cleaning"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Cleaning
          </Link>
          <Link
            to="/personal-care"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Personal Care
          </Link>
          <Link
            to="/info"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Info
          </Link>
          <Link
            to="/areas"
            className="text-gray-700 font-semibold hover:text-blue-800"
          >
            Areas
          </Link>

          <Link
            to="/login"
            className="mt-2 text-center px-4 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="mt-2 text-center px-4 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </div>
      )}
    </header>
  );
}
