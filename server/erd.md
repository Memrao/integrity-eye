User
-----
UserID (PK)
Username
Email
Password
CreatedAt
UpdatedAt

   | 1
   |
   | Many
   v

Image
-----
ImageID (PK)
UserID (FK)
ImageURL
UploadedAt
Processed

   | 1
   |
   | 1
   v

DetectionResult
---------------
ResultID (PK)
ImageID (FK)
DetectedObjects
DetectionTime
ConfidenceScore

   | 1
   |
   | Many
   v

Logs
----
LogID (PK)
UserID (FK)
Action
Timestamp
Details
=======================================================

Database Schema
Table: users
Column	Type	Description
id	INT (PK)	Primary Key, Auto Increment
name	VARCHAR(255)	User's full name
email	VARCHAR(255)	User's email, unique
password_hash	TEXT	Hashed password
created_at	TIMESTAMP	Account creation timestamp

======================================
integrity-eye-backend/
├── config/                       # Configuration files
│   ├── database.js               # Database connection
│   ├── serverConfig.js           # Server configuration (e.g., port, CORS)
├── controllers/                  # Controller files
│   ├── authController.js         # Authentication logic
│   ├── classroomController.js    # Classroom CRUD logic
│   ├── monitoringController.js   # Monitoring and logs logic
│   └── userController.js         # User-related logic (new)
├── models/                       # Model files
│   ├── User.js                   # User model
│   ├── Classroom.js              # Classroom model
│   ├── ActivityLog.js            # Suspicious activity model
│   └── index.js                  # Sequelize index (automatic imports)
├── migrations/                   # Migration files
│   ├── 001-create-user-table.js  # User table creation migration
│   ├── 002-create-classroom-table.js # Classroom table creation migration
├── routes/                        # Route files
│   ├── authRoutes.js             # Routes for authentication
│   ├── classroomRoutes.js        # Routes for classroom management
│   ├── monitoringRoutes.js       # Routes for monitoring
│   └── userRoutes.js             # Routes for user-related functionality (new)
├── services/                     # Service files for business logic
│   ├── authService.js            # Authentication service
│   ├── classroomService.js       # Classroom service
│   └── monitoringService.js      # Monitoring service
├── utils/                        # Utility files
│   ├── errorHandler.js           # Custom error handler
│   ├── logger.js                 # Logger utility
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── server.js                     # Main entry point
└── package.json                  # Dependencies and project settings
