import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI environment variable is not defined");
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to database successfully");
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message, "error connecting to database");
        } else {
            console.log(err, "error connecting to database");
        }
        process.exit(1);
    }
}

export default connectToDatabase;