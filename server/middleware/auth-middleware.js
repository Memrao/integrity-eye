import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  // Try to extract token from Authorization header or cookies
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;

  // If no token is found, return 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    // Log the error for debugging
    console.error('Authentication error:', error);

    // Return a 400 Bad Request if token is invalid
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired token.',
      error: error.message
    });
  }
};
