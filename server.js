const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const chatRoutes = require("./src/routes/chatRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve the existing React + Vite frontend
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

// GET route for the frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Chat API
app.use("/api/chat", chatRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});