import ApiResponse from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
    console.error("🔥 ERROR:", err);

    res.status(err.statusCode || 500).json(
        new ApiResponse(
            err.statusCode || 500,
            null,
            err.message || "Internal Server Error",
            false
        )
    );
};