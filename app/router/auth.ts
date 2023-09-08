const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.redirect("/auth/login");
});

router.get("/login", (req, res) => {
  return res.render("./auth/login", {
    name: process.env.PN,
  });
});

module.exports = router;
