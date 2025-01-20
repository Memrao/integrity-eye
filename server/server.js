import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // To manage environment variables securely
import { registerUser, loginUser } from './controllers/auth.controller.js'; // Separate controller for handling routes

dotenv.config(); // Load environment variables from .env file

const app = express();

// Enable CORS for all origins
app.use(cors());

// If you want to restrict CORS to a specific origin:
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5174', // Allow requests from specific origin or fallback to default
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Register and Login Routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
