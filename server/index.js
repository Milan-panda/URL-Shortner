const express = require("express");
const app = express();

const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./src/routes/authRoutes");
const authenticationMiddleware = require("./src/middleware/authentication");
const urlRoutes = require("./src/routes/urlRoutes");
const URL = require("./src/models/url");

//Middleware
app.use(express.json());
app.use(cors())

//Database Connection
const connectToDatabase = require("./src/config/database");
connectToDatabase();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/url", authenticationMiddleware, urlRoutes);
app.use('/', urlRoutes)



//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
