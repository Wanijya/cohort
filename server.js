const express = require("express");

const app = express(); // es line par server create ho jata hai.

app.get("/home", (req, res) => {
  // es line par ham server ko program kar rahe hain ki jab koi /home URL par jaye to kya response dena hai.
  res.send("Welcome to the Home Page");
});

app.get("/about", (req, res) => {
  // es line par ham server ko program kar rahe hain ki jab koi /about URL par jaye to kya response dena hai.
  res.send("This is the About Page");
});

app.listen(3000, () => {
  // es line par server ko listen (start) karaya jata hai.
  console.log("Server is running on port 3000");
});
