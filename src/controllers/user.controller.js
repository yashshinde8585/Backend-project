import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';
import { apiResponse } from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;
    console.log("Email:", email);

    // Validate required fields
    if ([fullname, username, email, password].some((field) => !field?.trim())) {
        throw new apiError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new apiError(409, "User with email or username already exists");
    }

    // Check if files are uploaded
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar file is required");
    }

    // Upload images to Cloudinary
    const avatarUpload = await uploadOnCloudinary(avatarLocalPath);
    const coverImageUpload = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    if (!avatarUpload) {
        throw new apiError(400, "Failed to upload avatar");
    }

    // Create new user
    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password, // Consider hashing before storing
        avatar: avatarUpload.url,
        coverImage: coverImageUpload?.url || "",
    });

    // Retrieve user without sensitive fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user");
    }

    // Send response
    return res.status(201).json(new apiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
