// routes/auth-routes/auth.route.js

import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword, // Import forgotPassword here
  resetPassword,
  checkAuth,
} from "../../controllers/auth.controller.js";
import { authenticate } from "../../middleware/auth-middleware.js"; // Auth middleware

const router = express.Router();

// Check authentication status (protected route)
router.get("/check-auth", authenticate, checkAuth);

// User signup
router.post("/signup", signup); // Use signup function

// User login
router.post("/login", login); // Use login function

// User logout
router.post("/logout", authenticate, logout);

// Email verification
router.post("/verify-email", verifyEmail);

// Forgot password
router.post("/forgot-password", forgotPassword); // Use forgotPassword function

// Reset password
router.post("/reset-password/:token", resetPassword);

// Protected user profile route
router.get("/profile", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "User profile fetched successfully",
    data: req.user,
  });
});

export default router;
