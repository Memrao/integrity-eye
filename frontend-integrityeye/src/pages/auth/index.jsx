import { Link } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import sImage from "./image/s.png"; // Ensure this path is correct

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-gray-100 text-gray-800 shadow-md">
        <Link to="/" className="flex items-center">
          <span className="font-extrabold text-xl">Integrity Eye</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/about"
            className="hover:underline hover:text-gray-600 transition duration-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:underline hover:text-gray-600 transition duration-200"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-100 text-gray-800 z-10 shadow-lg">
            <nav className="flex flex-col space-y-4 p-4">
              <Link
                to="/about"
                className="hover:underline hover:text-gray-600 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:underline hover:text-gray-600 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
          {/* Left Side (Image + Text) */}
          <div
            className={`flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-900 to-blue-600 p-6 text-white ${
              activeTab === "signin" ? "md:order-2" : "md:order-1"
            }`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src={sImage}
                alt="Illustration"
                className="object-cover w-full h-[80%]"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left mt-4 md:mt-0">
              <p
                className="text-4xl md:text-5xl font-extrabold leading-tight tracking-widest mb-4"
                style={{
                  WebkitTextStroke: "2px white",
                  color: "transparent",
                }}
              >
                DO
              </p>
              <p
                className="text-4xl md:text-5xl font-extrabold leading-tight tracking-widest mb-4"
                style={{
                  WebkitTextStroke: "2px white",
                  color: "transparent",
                }}
              >
                NOT
              </p>
              <p
                className="text-4xl md:text-5xl font-extrabold leading-normal tracking-widest"
                style={{
                  WebkitTextStroke: "2px white",
                  color: "transparent",
                }}
              >
                CHEAT
              </p>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div
            className={`p-10 flex flex-col justify-center bg-white border-2 border-gray-300 rounded-lg relative ${
              activeTab === "signin" ? "md:order-1" : "md:order-2"
            }`}
          >
            {activeTab === "signin" && (
              <button
                className="absolute top-4 left-4 text-gray-500 hover:text-pastelBlue-dark transition"
                onClick={() => setActiveTab("signup")}
              >
                <IoArrowBack className="h-6 w-6" />
              </button>
            )}

            <h2 className="text-2xl font-bold mb-6 text-pastelBlue-dark">
              {activeTab === "signup" ? "Create an account" : "Sign In"}
            </h2>

            {activeTab === "signup" ? (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="mb-6 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                />
                <button
                  className="text-white py-2 rounded-md font-semibold transition hover:opacity-90 shadow-lg w-full"
                  style={{
                    background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
                    boxShadow: "0px 4px 15px rgba(30, 58, 138, 0.4)",
                  }}
                >
                  Create Account
                </button>

                <div className="flex items-center justify-center mt-4">
                  <button className="bg-white border py-2 px-4 rounded-md text-gray-700 mr-2 flex items-center justify-center space-x-2">
                    <FcGoogle className="text-xl" />
                    <span>Sign up with Google</span>
                  </button>
                </div>
                <p className="text-gray-500 text-sm text-center mt-6">
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signin")}
                    className="text-pastelBlue-dark underline hover:text-blue-500"
                  >
                    Log in
                  </button>
                </p>
              </>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="mb-6 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue"
                />
                <Link to="/forgot-password" className="text-pastelBlue-dark text-sm mb-4">
                  Forgot Your Password?
                </Link>
                <button
                  className="text-white py-2 rounded-md font-semibold transition hover:opacity-90 shadow-lg w-full"
                  style={{
                    background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
                    boxShadow: "0px 4px 15px rgba(30, 58, 138, 0.4)",
                  }}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 lg:px-6 h-16 shadow-md flex items-center justify-center bg-gray-200 text-gray-800 text-sm">
        © 2024 Integrity Eye. All rights reserved.
      </footer>
    </div>
  );
}

export default AuthPage;
