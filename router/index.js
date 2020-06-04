const router = require("express").Router();
const signin = require('./signin');
const signup = require('./signup');
const validate = require( './validate' );

require("es6-promise").polyfill();
require("isomorphic-fetch");

router.post("/signup", (req, res, next) => {
    signup(req, res, next);
})

router.post("/signin", (req, res, next) => {
    signin(req, res, next);
})

router.get("/validation/:id", (req, res, next) => {
    validate(req, res, next);
})

module.exports = router;
