import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";

connectDB();
















/*
const app = express();
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("error")
            throw err;
        })
        app.listen(process.env.PORT, () => {
            console.log("server is running on port", process.env.PORT);
        })
    } catch (error) {
        console.error("error", error);
        throw err;
    }
})();
*/