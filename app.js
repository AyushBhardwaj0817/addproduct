const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectdb = require("./db/connection.js");
const userrouter = require("./routes/userRouter.js");

// Set template engine
app.set("view engine", "ejs");
app.set("views", path.resolve('./views')); // Fixed spelling error from "view engin" to "view engine"

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Database connection
require("./Models/user.js");
const port = process.env.PORT || 8000;
const database = process.env.DATABASE; // Ensure this matches the variable in your .env file
mongoose.set('strictQuery', false);
connectdb(database);

// Routes
app.use("/api/user", userrouter);

app.get('/home', async (req, res) => {
  return res.render('home');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
