const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  return res.status(200).json("user")
});

router.post("/", async (req, res) => {
  try {
    console.log("user post")
    const { name, country, city } = req.body;
    const user = new User({ name, country, city });
    await user.save();
    return res.status(200).json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;