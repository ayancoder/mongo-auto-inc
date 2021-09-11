const express = require("express");
const router = express.Router();
const Items = require("../models/Item");

router.get("/", (req, res) => {
    Items.getItems(function (err, items) {
        if (err) {
            throw err;
        }
        res.json(items);
    });
});

router.post("/", async (req, res) => {
  try {
    const { text, key, status } = req.body;
    const item = new Item({ text, key, status });
    await item.save();
    return res.status(200).json(item)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:_key", (req, res) => {
    var key = req.params._key;
    Items.deleteItem(key, function (err, items) {
        if (err) {
            throw err;
        }
        res.json(items);
    });
});

router.delete("/", (req, res) => {
    var status = "completed";
    Items.deleteItems(status, function (err, items) {
        if (err) {
            throw err;
        }
        res.json(items);
    });
});

router.put("/:_key", (req, res) => {
    var key = req.params._key;
    var item = req.body;

    Items.updateItem(key, item, {}, function (err, items) {
        if (err) {
            throw err;
        }
        res.json(items);
    });
});

/* app.put("/api", (req, res) => {
    Items.updateAllItem(function (err, items) {
        if (err) {
            throw err;
        }
        res.json(items);
    });
}); */

module.exports = router;
