const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ added
require("dotenv").config();

const app = express();

app.use(cors()); // ✅ VERY IMPORTANT
app.use(express.json());

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);

const borrowRoutes = require("./routes/borrowRoutes");
app.use("/borrow", borrowRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error ❌", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server + Database running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});