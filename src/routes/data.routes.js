const express = require("express");
const router = express.Router();
const { getData } = require("../controllers/data.controller");

router.get("/dados", getData);

module.exports = router;
