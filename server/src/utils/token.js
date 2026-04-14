import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10d",
    });
}

export const verifytoken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};