import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("CONnected to database");
        return connect;
    } catch (error) {
        console.error("Failed to connect to database", error.message);
        process.exit(1);
    }
}

export default connectDB;
