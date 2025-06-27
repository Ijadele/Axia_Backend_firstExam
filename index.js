const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route");
const kycRoutes = require("./routes/kyc.route")
const postRoutes = require("./routes/post.route");
const dotenv = require("dotenv")

dotenv.config(); //  Load environment variables from .env

const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// Use User routes
app.use(userRoutes);
app.use(postRoutes);
app.use(kycRoutes);

// connect to MongoDB
mongoose
    .connect(process.env.MONGOOSE_API_URL)
    .then(() => console.log("MongoDB connection was successful"))
    .catch((err) => console.error("MongoDB connection error:", err.message))


// start the server
const port = process.env.PORT
app.listen(port, console.log(`App is listening on http://localhost:${port}`))