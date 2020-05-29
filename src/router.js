const express = require("express");
const db = require('./db');

const router = express.Router();

require("es6-promise").polyfill();
require("isomorphic-fetch");

router.post("/register", (req, res) => {
    db.register(req, res);
})

module.exports = router;
