const router = require("express").Router();
const signin = require('./signin');
const signup = require('./signup');
const validate = require( './validate' );
const profile = require( './profile' );
const jwt = require('jsonwebtoken');

require("es6-promise").polyfill();
require("isomorphic-fetch");

router.use("/update", profile.update);

router.post("/signup", (req, res, next) => {
    signup(req, res, next);
})

router.post("/signin", (req, res, next) => {
    signin(req, res, next);
})

router.get("/validation/:id", (req, res, next) => {
    validate(req, res, next);
})

router.get('/profile', (req, res, next) => {
    const header = req.headers['authorization'];
    
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        profile.getData(req, res, next);
    } else {
        console.log('Forbidden')
        res.status(403).send('Not signed in or invalid connection');
    }
});

module.exports = router;
