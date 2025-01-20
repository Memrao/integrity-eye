import { useState } from "react";
import axios from 'axios'; // For making API requests

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP, Step 3: Reset password
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle email submission (Step 1)
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error
    setSuccessMessage(""); // Reset success

    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    try {
      // Send OTP request to backend
      await axios.post("http://localhost:5000/api/forgot-password", { email });
      setSuccessMessage("OTP sent to your email.");
      setStep(2); // Move to Step 2 (Enter OTP)
    } catch (err) {
      setErrorMessage(err.response?.data.message || "Error sending OTP. Please try again.");
    }
  };

  // Function to handle OTP verification (Step 2)
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error
    setSuccessMessage(""); // Reset success

    if (!otp) {
      setErrorMessage("OTP is required.");
      return;
    }

    try {
      // Verify OTP
      const response = await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
      if (response.data.success) {
        setSuccessMessage("OTP verified successfully.");
        setStep(3); // Move to Step 3 (Reset Password)
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setErrorMessage(err.response?.data.message || "Error verifying OTP.");
    }
  };

  // Function to handle password reset (Step 3)
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error
    setSuccessMessage(""); // Reset success

    if (!newPassword) {
      setErrorMessage("New password is required.");
      return;
    }

    try {
      // Send password reset request to backend
      await axios.post("http://localhost:5000/api/reset-password", { email, newPassword });
      setSuccessMessage("Password reset successfully. You can now log in with your new password.");
    } catch (err) {
      setErrorMessage(err.response?.data.message || "Error resetting password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        
        {/* Show error or success messages */}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        {/* Step 1: Enter email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-3 w-full border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4 p-3 w-full border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordReset}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4 p-3 w-full border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
