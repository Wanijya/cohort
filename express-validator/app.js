const express = require("express");
const velidators = require("./middleware/validator.middleware");

const app = express();

app.use(express.json());

app.post("/register", velidators.registerValidationRules, (req, res) => {
  const { username, email, password } = req.body;

  res.json({ username, email, password });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
