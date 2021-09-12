const express = require("express");
const router = express.Router();
const Page = require("../models/Page");

router.get("/", (req, res) => {
  return res.status(200).json("user")
});


router.post("/", async (req, res) => {
  try {
    console.log("user post");
    const { title, description,officeName } = req.body;
    const page = new Page({ title, description, officeName });
    await page.save();
    return res.status(200).json(page);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;