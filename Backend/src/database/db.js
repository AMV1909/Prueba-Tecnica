import { connect } from "mongoose";
import { config } from "dotenv";

config();

export const connectDB = await connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_NAME,
})
    .then(() =>
        console.log(`Connected to ${process.env.MONGODB_NAME}`)
    )
    .catch((err) => console.log(err));
