const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  window: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after an hour",
});

// app.use(limiter); or

app.post("/api/auth/register", limiter, (req, res) => {
  res.status(200).json({
    message: "User registered successfully",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
