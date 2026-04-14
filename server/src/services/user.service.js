import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import {generateToken} from "../utils/token.js";

export const registerUser = async ({ name, email, password }) => {
    const userExists = await User.findOne({ email });

    if (userExists) throw new ApiError(400, "User already exists");

    const username = await generateUsername(name);

    const user = await User.create({ 
        name, 
        email, 
        password,
        username
    });

    user.password = undefined;

    return user;
};


export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new ApiError(400, "User not found");

    const isMatch = await user.comparePassword(password);

    if (!isMatch) throw new ApiError(400, "Invalid email or password");

    const token = generateToken({ id: user._id, role: user.role  });

    user.password = undefined;

    return { user, token };
};

export const getProfile = async ({ userId }) => {
    const user = await User.findById(userId);

    if (!user) throw new ApiError(400, "User not found");

    return user;
};

export const editProfile = async ({ userId, data }) => {
    const user = await User.findById(userId).select("+password");

    if (!user) throw new ApiError(400, "User not found");

    if (data.name) user.name = data.name;
    if (data.password) user.password = data.password;

    await user.save();

    user.password = undefined;

    return user;
};

const generateUsername = async (name) => {
  let username;
  let exists = true;

  while (exists) {
    const base = name.toLowerCase().replace(/\s+/g, "");
    const random = Math.floor(1000 + Math.random() * 9000);
    username = `${base}_${random}`;

    const user = await User.findOne({ username });
    if (!user) exists = false;
  }

  return username;
};
