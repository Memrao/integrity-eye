import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // Import JWT for generating verification tokens

dotenv.config();

// Initialize Sequelize instance (you might already have it initialized elsewhere)
const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'mysql',
  logging: false,
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure email is unique
    validate: {
      isEmail: true,  // Ensure email format is correct
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user', // Default role is 'user'
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default to false until verified
    allowNull: false,
  },
  // Optional fields
  // You can add more fields as per your requirement, such as `profilePicture`, `address`, etc.
});

// Hook to hash password before saving to the database
User.beforeCreate(async (user) => {
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;  // Store hashed password
  }
});

// Method to validate password
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);  // Compare plain password with hashed password
};

// Optional: Set verification token (for email verification purposes)
User.prototype.setVerificationToken = function () {
  const verificationToken = jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return verificationToken;
};

export default User;
