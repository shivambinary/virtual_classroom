import { verifytoken } from "../utils/token.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ApiError(401, "Not authorized"));
    }

    try {
        const decoded = verifytoken(token);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return next(new ApiError(401, "User not found"));
        }

        req.user = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid token"));
    }
};

export default protect;