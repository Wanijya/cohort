const express = require("express");
const connectToDB = require("./src/db/db");
const noteModel = require("./src/models/note.model");

connectToDB();
const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);
  await noteModel.create({ title, content });
  res.json({ message: "Note created successfully" });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.json({ message: "Notes Fatch successfully", notes });
});

app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  await noteModel.findOneAndDelete({
    _id: noteId,
  });
  res.json({ message: "Note deleted successfully" });
});

app.patch("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const { title } = req.body;

  await noteModel.findOneAndUpdate(
    {
      _id: noteId,
    },
    {
      title: title,
    }
  );
  res.json({ message: "Note updated successfully" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
