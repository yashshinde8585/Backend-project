This is the backend for a video-sharing application, similar in concept to a simplified YouTube. It's built with Node.js and Express.js and provides the core functionalities for user management (registration, login, logout) and handling video data.

### Project Overview

This backend application serves as the server-side logic for a video platform. It handles user authentication, data storage for users and videos, and file uploads for user avatars and cover images. It's designed to be a RESTful API that a front-end application (like a website or mobile app) would interact with.

### Core Features

  * **User Registration**: New users can create an account by providing their full name, a unique username, an email address, and a password. They must also upload an avatar image.
  * **User Login**: Registered users can log in using their username or email and password. Upon successful authentication, the server provides them with access and refresh tokens to authorize future requests.
  * **User Logout**: Logged-in users can securely log out, which invalidates their current session.
  * **Secure Password Handling**: User passwords are not stored directly. They are securely hashed using the `bcrypt` library before being saved in the database, which is a critical security practice.
  * **Image Uploads with Cloudinary**: The application uses the Cloudinary service to handle image uploads. When a user registers, their avatar and optional cover image are uploaded to Cloudinary, and the URLs are stored in the user's database record. This offloads the burden of file storage from the application server.
  * **Protected Routes**: Certain actions, like logging out, are protected. A user must provide a valid JSON Web Token (JWT) to access these routes, ensuring that only authenticated users can perform them.
  * **Structured API Responses**: The API uses standardized classes (`apiResponse` and `ApiError`) to send consistent and predictable responses to the client, which makes front-end development easier.

### Project Structure and File Explanations

Here's a breakdown of what each file does and how they fit together:

  * **`src/index.js`**: This is the application's entry point. It loads environment variables, connects to the MongoDB database, and starts the Express server.
  * **`src/app.js`**: This file creates and configures the main Express application. It sets up essential middleware for handling Cross-Origin Resource Sharing (CORS), parsing JSON and URL-encoded data, managing cookies, and serving static files. It also imports and mounts the user-related API routes.
  * **`src/db/index.js`**: This file contains the function responsible for establishing the connection to the MongoDB database using Mongoose.
  * **`src/constants.js`**: A simple file to store constant values. In this project, it defines the name of the database (`DB_NAME`).

**Data Models (`src/models`)**

  * **`user.model.js`**: Defines the `User` schema for the database. It specifies the structure of a user document, including fields like `username`, `email`, `password`, `avatar`, and `coverImage`. It also includes powerful Mongoose middleware (`pre("save")`) to automatically hash the user's password before it's saved. Furthermore, it defines methods for generating JWTs (`generateAccessToken`, `generateRefreshToken`) and for comparing passwords during login (`isPasswordMatch`).
  * **`video.model.js`**: Defines the `Video` schema. This outlines the structure for video data, including the video file URL, thumbnail, title, description, duration, and the owner (a reference to a `User`). It also includes a plugin for pagination, which will be useful for displaying lists of videos.

**Controllers (`src/controllers`)**

  * **`user.controller.js`**: This file contains the core logic for handling user-related API requests.
      * `registerUser`: Handles the creation of a new user, including validating input, checking for existing users, uploading files to Cloudinary, and saving the new user to the database.
      * `loginUser`: Manages user login by finding the user, validating their password, and generating access and refresh tokens.
      * `logoutUser`: Handles user logout by clearing the authentication cookies.

**Middleware (`src/middlewares`)**

  * **`multer.middlewares.js`**: This file configures `multer`, a middleware for handling file uploads. It sets up disk storage to temporarily save uploaded files before they are processed (e.g., uploaded to Cloudinary).
  * **`auth.middlewares.js`**: Contains the `verifyJWT` middleware. This function is crucial for security. It checks for a valid JWT in the request's cookies or authorization header and, if valid, decodes it to identify the user making the request. This allows the application to protect certain routes and know who the current user is.

**Routes (`src/routes`)**

  * **`user.routes.js`**: This file defines the API endpoints (routes) related to users. It maps HTTP methods and URL paths (like `POST /register`) to the corresponding controller functions. It also applies the `upload` middleware for the registration route to handle the avatar and cover image file uploads, and the `verifyJWT` middleware to the logout route to ensure it's a secured action.

**Utilities (`src/utils`)**

  * **`Cloudinary.js`**: Provides the `uploadOnCloudinary` function, which handles the logic of uploading a file from the local server to the Cloudinary cloud storage service and then deleting the local file.
  * **`asyncHandler.js`**: A higher-order function that wraps asynchronous route handlers. This is a clean way to handle promises and ensures that any errors that occur in an async function are properly caught and passed to Express's error handling mechanism.
  * **`ApiError.js`**: Defines a custom `Error` class that allows for creating more structured and informative error objects, including an HTTP status code.
  * **`apiResponse.js`**: A class for creating standardized JSON responses, which helps in maintaining a consistent API structure.

### How to Run This Project (Setup Guide)

To get this application running on your local machine, you would typically follow these steps:

1.  **Prerequisites:**

      * Node.js and npm (or yarn) installed.
      * Access to a MongoDB database (either a local installation or a cloud service like MongoDB Atlas).
      * A Cloudinary account to get API credentials.

2.  **Clone and Install Dependencies:**

      * You would first get the code onto your machine.
      * In your terminal, navigate to the project's root directory and run `npm install` to download all the necessary libraries listed in the `package.json` file.

3.  **Environment Variables:**

      * Create a file named `.env` in the root of the project. This file will store your secret keys and configuration variables.
      * Based on the code, you would need to add the following variables to your `.env` file:
        ```
        PORT=8000
        CORS_ORIGIN=*

        MONGO_URI=your_mongodb_connection_string

        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret

        ACCESS_TOKEN_SECRET=your_strong_access_token_secret
        ACCESS_TOKEN_EXPIRES_IN=1d
        REFRESH_TOKEN_SECRET=your_strong_refresh_token_secret
        REFRESH_TOKEN_EXPIRES_IN=10d
        ```
      * You must replace the placeholder values (`your_...`) with your actual credentials from MongoDB and Cloudinary. The token secrets should be long, random, and secret strings.

4.  **Start the Server:**

      * Once the dependencies are installed and the `.env` file is configured, you can start the application by running the command `npm run dev` or `node src/index.js` in your terminal (depending on the scripts defined in `package.json`).
      * You should see a message in your console indicating that the server is running and that the database has successfully connected.

5.  **Using the API:**

      * With the server running, you can now use an API testing tool like Postman or Insomnia to send requests to the endpoints you've defined (e.g., send a `POST` request to `http://localhost:8000/api/v1/user/register` to create a new user).

-[Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)
