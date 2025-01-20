import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/User";

dotenv.config();

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password strength
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  try {
    // Input validation
    if (!userName || !userEmail || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!isValidEmail(userEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters, with uppercase, lowercase, number, and special character",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ userEmail }, { userName }] });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // Password hashing
    const hashPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      userName,
      userEmail,
      role,
      password: hashPassword,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// User login
const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    // Input validation
    if (!userEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const checkUser = await User.findOne({ userEmail });

    if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Send the response with the token in a cookie
    res
      .status(200)
      .cookie("token", accessToken, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS in production
        sameSite: "strict", // Protects against CSRF
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      })
      .json({
        success: true,
        message: "Logged in successfully",
        data: {
          user: {
            _id: checkUser._id,
            userName: checkUser.userName,
            userEmail: checkUser.userEmail,
            role: checkUser.role,
          },
        },
      });

  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

export { registerUser, loginUser, checkAuth };
