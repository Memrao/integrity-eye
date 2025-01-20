import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios'; 
import sImage from "./image/s.png"; 
import Logo from './image/Logo.png';

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    setSuccessMessage(""); 

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      if (activeTab === "signup") {
        await axios.post('http://localhost:5000/api/register', formData);
        setSuccessMessage("Account created successfully! You will be redirected.");
        setTimeout(() => navigate('../dashboard'), 2000);
      } else {
        const response = await axios.post('http://localhost:5000/api/login', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("authToken", response.data.token);
        navigate('../dashboard');
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      if (err.response) {
        setErrorMessage(err.response.data.message || "An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-gray-100 text-gray-800 shadow-md">
        <Link to="/" className="flex items-center mr-4">
          <img src={Logo} alt="Logo" className="w-13 h-12 mr-4" />
          <span className="font-extrabold text-xl">Integrity Eye</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/about" className="hover:underline hover:text-gray-600 transition duration-200">About Us</Link>
          <Link to="/contact" className="hover:underline hover:text-gray-600 transition duration-200">Contact Us</Link>
        </nav>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-100 text-gray-800 z-10 shadow-lg">
            <nav className="flex flex-col space-y-4 p-4">
              <Link to="/about" className="hover:underline hover:text-gray-600 transition duration-200" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="hover:underline hover:text-gray-600 transition duration-200" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
          {/* Left Side (Image + Text) */}
          <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-900 to-blue-600 p-6 text-white">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img src={sImage} alt="Illustration" className="object-cover w-full max-h-96" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start mt-4 md:mt-0 md:pl-4">
              <p className="text-4xl md:text-5xl font-extrabold leading-tight tracking-widest mb-2" style={{ WebkitTextStroke: "2px white", color: "transparent" }}>DO</p>
              <p className="text-4xl md:text-5xl font-extrabold leading-tight tracking-widest mb-2" style={{ WebkitTextStroke: "2px white", color: "transparent" }}>NOT</p>
              <p className="text-4xl md:text-5xl font-extrabold leading-tight tracking-widest" style={{ WebkitTextStroke: "2px white", color: "transparent" }}>CHEAT</p>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className={`p-10 flex flex-col justify-center bg-white border-2 border-gray-300 rounded-lg relative ${activeTab === "signin" ? "md:order-1" : "md:order-2"}`}>
            {activeTab === "signin" && (
              <button className="absolute top-4 left-4 text-gray-500 hover:text-pastelBlue-dark transition" onClick={() => setActiveTab("signup")}>
                <IoArrowBack className="h-6 w-6" />
              </button>
            )}

            <h2 className="text-2xl font-bold mb-6 text-pastelBlue-dark">
              {activeTab === "signup" ? "Create an account" : "Sign In"}
            </h2>

            {/* Display Success or Error Messages */}
            {successMessage && (
              <div className="mb-4 text-green-500 text-sm">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}

            <form onSubmit={handleFormSubmit}>
              {activeTab === "signup" ? (
                <>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="mb-6 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue" />
                  <button type="submit" className="text-white py-2 rounded-md font-semibold transition hover:opacity-90 shadow-lg w-full" style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)", boxShadow: "0px 4px 15px rgba(30, 58, 138, 0.4)" }}>Create Account</button>
                  <div className="flex items-center justify-center mt-4">
                    <button className="bg-white border py-2 px-4 rounded-md text-gray-700 mr-2 flex items-center justify-center space-x-2">
                      <FcGoogle className="text-xl" />
                      <span>Sign up with Google</span>
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm text-center mt-6">Already have an account? <button onClick={() => setActiveTab("signin")} className="text-pastelBlue-dark hover:underline hover:text-blue-500">Log in</button></p>
                </>
              ) : (
                <>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="mb-6 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastelBlue" />
                  <button type="submit" className="text-white py-2 rounded-md font-semibold transition hover:opacity-90 shadow-lg w-full" style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)", boxShadow: "0px 4px 15px rgba(30, 58, 138, 0.4)" }}>Sign In</button>
                  {/* Forgot Password Link */}
                 
                  <div className="flex items-center justify-center mt-4">
                    <button className="bg-white border py-2 px-4 rounded-md text-gray-700 mr-2 flex items-center justify-center space-x-2">
                      <FcGoogle className="text-xl" />
                      <span>Sign in with Google</span>
                    </button>
                    

                  </div>
                 
                  <p className="text-gray-500 text-sm text-center mt-6">Do not have an account? <button onClick={() => setActiveTab("signup")} className="text-pastelBlue-dark hover:underline hover:text-blue-500">Sign up</button>  <Link to="/forgot-password" className="text-gray-500 text-xs hover:underline block text-center mt-1">Forgot Password?</Link></p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 mt-8 text-center bg-gray-100 text-gray-800 shadow-md">
  <div className="flex justify-between items-center px-6">
    <div className="flex-1 text-center">
      <p className="text-sm">© 2025 Integrity Eye. All rights reserved.</p>
    </div>
    {/* <nav className="space-x-4">
      <Link to="/privacy-policy" className="hover:text-gray-800">Privacy Policy</Link>
      <Link to="/terms" className="hover:text-gray-800">Terms of Service</Link>
    </nav> */}
  </div>
</footer>

    </div>
  );
}

export default AuthPage;
