const express = require("express");
const mongoose = require("mongoose")
const userRoutes = require("./routes/user.route")
const dotenv = require("dotenv")

dotenv.config(); //  Load environment variables from .env

const app = express()


// connect mong
mongoose
    .connect(process.env.MONGOOSE_API_URL)
    .then(() => console.log("MongoDB connection was successful"))
    .catch((err) => console.error("MongoDB connection error:", err.message))


// ✅ Middleware to parse JSON
app.use(express.json());

app.use(userRoutes)

// start the server
const port = process.env.PORT
app.listen(port, console.log(`App is listening on http://localhost:${port}`))