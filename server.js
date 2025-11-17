const express = require("express");
const connectToDB = require("./src/db/db");

connectToDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/notes", (req, res) => {
  //   console.log(req.body); // bydefault undefined, you should use express.json() middleware
  const { title, content } = req.body;
  console.log(title, content);
});

app.listen(4000, () => {
  console.log("Server start PORT 4000");
});
