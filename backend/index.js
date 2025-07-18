const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/notesdb")
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });
