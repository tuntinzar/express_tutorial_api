const express = require("express");
const router = express.Router();
const Fashion = require("../model/Fashion");

async function getOneFashion(req, res, next) {
  try {
    fashion = await Fashion.findById(req.params._id);
    if (fashion == null) {
      return res.status(404).json({ message: "Can't Find any more" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.fashion = fashion;
  next();
}

router.get("/", async (req, res) => {
  try {
    const fashions = await Fashion.find();
    res.json(fashions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getOneFashion, (req, res) => {
  res.json(res.fashion);
});

router.post("/", async (req, res) => {
  const fashion = new Fashion({
    name: req.body.name,
    brand: req.body.brand,
    quantity: req.body.quantity,
    price: req.body.price
  });
  try {
    const newFashion = await fashion.save();
    res.status(201).json(newFashion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", (req, res) => {
  router.patch("/:id", getOneFashion, async (req, res) => {
    if (req.body.name != null) {
      res.body.name = req.body.name;
    }
    if (req.body.brand != null) {
      res.body.brand = req.body.brand;
    }
    if (req.body.quantity != null) {
      res.body.quantity = req.body.quantity;
    }
    if (req.body.price != null) {
      res.body.price = req.body.price;
    }
    try {
      const updateFashion = await res.fashion.save();
      res.json(updateFashion);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
});

router.delete("/:id", getOneFashion, async (res, req) => {
  try {
    await res.fashion.remove();
    res.json({ message: "Delete this Fashion" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
