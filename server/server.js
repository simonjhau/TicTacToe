const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

// Game API Routes
app.use("/api/game", require("./api/game"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
