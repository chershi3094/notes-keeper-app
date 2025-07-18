const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  deleteNote,
} = require("../controllers/noteController");

router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);

module.exports = router;
