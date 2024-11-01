import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
// import "./authpage.css";
import backgroundImage from './image/1.jpg';

function Authpage() {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <div className="flex flex-col min-h-screen #dcdcdc">
      {/* Header with Logo and Tab Buttons */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to={"/"} className="flex items-center">
          <Eye className="h-8 w-8 mr-4 text-pastelBlue-dark" />
          <span className="font-extrabold text-xl text-pastelBlue-dark">Integrity Eye</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
          {/* Left Side (Form) */}
          <div className="p-10 flex flex-col justify-center bg-gray-100">
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
                <button className="bg-pastelBlue text-black py-2 rounded-md font-semibold hover:bg-pastelBlue-dark transition">
                  Create Account
                </button>
                <div className="flex items-center justify-center mt-4">
                  <button className="bg-white border py-2 px-4 rounded-md text-gray-700 mr-2 flex items-center justify-center space-x-2">
                    <FcGoogle className="text-xl" />
                    <span>Sign up with Google</span>
                  </button>
                </div>
                <p className="text-gray-500 text-sm text-center mt-4">
                  Already have an account?{" "}
                  <button onClick={() => setActiveTab("signin")} className="text-pastelBlue-dark">
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
                <button className="bg-pastelBlue text-black py-2 rounded-md font-semibold hover:bg-pastelBlue-dark transition">
                  Login In
                </button>
              </>
            )}
          </div>

          {/* Right Side (Image Placeholder) */}
          <div
            className="hidden md:block bg-cover bg-center relative"
            // style={{ backgroundImage: `url('/1.jpg')` }}
            style={{ backgroundImage: `url(${backgroundImage})` }}

          >
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="relative flex flex-col justify-center items-center h-full p-10 text-white text-center">
              {/* <p className="text-lg font-semibold">Your Tagline or Quote Here</p>
              <span className="mt-2 text-sm">- Founder, Integrity Eye</span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © 2024 Integrity Eye. All rights reserved.
      </footer>
    </div>
  );
}

export default Authpage;
