
# Video Platform Backend

This repository contains the backend service for a video-sharing platform, similar in concept to a simplified YouTube. It provides the core functionalities for user management, video data handling, and media uploads. This RESTful API is designed to be consumed by a front-end application (like a website or mobile app).

## ✨ Core Features

  * **User Registration**: New users can create an account with their full name, a unique username, email, and password, along with an avatar image.
  * **User Login**: Registered users can log in via username or email to receive an access token and a refresh token for session management.
  * **Secure Logout**: Logged-in users can securely invalidate their current session.
  * **Secure Password Handling**: User passwords are never stored in plaintext. They are securely hashed using **bcrypt** before being saved to the database.
  * **Cloud Image Uploads**: Integrates with **Cloudinary** to handle all image uploads for user avatars and cover images, offloading file storage from the application server.
  * **Protected Routes**: Key API endpoints are protected using **JSON Web Tokens (JWT)**, ensuring only authenticated users can perform sensitive actions.
  * **Structured API Responses**: The API uses a standardized response structure to send consistent and predictable data to the client, simplifying front-end development.

## 🛠️ Tech Stack

  * **Backend**: Node.js, Express.js
  * **Database**: MongoDB with Mongoose ODM
  * **Authentication**: JSON Web Tokens (JWT), Bcrypt
  * **File Uploads**: Multer, Cloudinary
  * **Middleware**: Cookie-Parser, CORS
  * **Utilities**: Dotenv

## 🚀 Getting Started

To get this project up and running on your local machine, follow these steps.

### Prerequisites

  * Node.js (v18.x or later)
  * npm or yarn
  * MongoDB instance (local or cloud-based like MongoDB Atlas)
  * A Cloudinary account for API credentials

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following configuration variables.

    ```env
    PORT=8000
    CORS_ORIGIN=*

    # MongoDB Connection String
    MONGO_URI=your_mongodb_connection_string

    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    # JWT Secrets
    ACCESS_TOKEN_SECRET=your_strong_access_token_secret
    ACCESS_TOKEN_EXPIRES_IN=1d
    REFRESH_TOKEN_SECRET=your_strong_refresh_token_secret
    REFRESH_TOKEN_EXPIRES_IN=10d
    ```

    > **Note:** Replace the placeholder values (`your_...`) with your actual credentials. The token secrets should be long, random strings.

4.  **Start the server:**

    ```sh
    npm run dev
    ```

    You should see a console message indicating that the server is running and the database is connected.

### Using the API

With the server running, you can use an API client like **Postman** or **Insomnia** to interact with the available endpoints.

**Example: Register a new user**

  * **Endpoint**: `POST /api/v1/user/register`
  * **Body**: `multipart/form-data` with fields for `fullname`, `username`, `email`, `password`, and an `avatar` file.

## 📁 Project Structure

Here is a breakdown of the project's structure and the purpose of each directory:

```
src
├── 📂 app.js                # Main Express app configuration and middleware setup
├── 📂 constants.js          # Application-wide constants (e.g., DB_NAME)
├── 📂 index.js              # Application entry point: connects to DB and starts the server
│
├── 📂 db
│   └── 📄 index.js          # MongoDB connection logic
│
├── 📂 models
│   ├── 📄 user.model.js     # Mongoose schema and model for Users
│   └── 📄 video.model.js    # Mongoose schema and model for Videos
│
├── 📂 controllers
│   └── 📄 user.controller.js # Logic for handling user-related requests (register, login, etc.)
│
├── 📂 middlewares
│   ├── 📄 auth.middlewares.js  # JWT verification middleware
│   └── 📄 multer.middlewares.js# Multer configuration for file uploads
│
├── 📂 routes
│   └── 📄 user.routes.js     # API routes for user-related actions
│
└── 📂 utils
    ├── 📄 ApiError.js        # Custom Error class for structured error responses
    ├── 📄 apiResponse.js     # Custom class for standardized success responses
    ├── 📄 asyncHandler.js    # Higher-order function to handle async errors in controllers
    └── 📄 Cloudinary.js      # Utility for uploading files to Cloudinary
```

