const router = require("express").Router();
const signin = require('./signin');
const signup = require('./signup');
const validate = require( './validate' );
const jwt = require('jsonwebtoken');

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


const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    console.log(req.headers);

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        console.log('Forbidden')
        res.sendStatus(403)
    }
}

router.get('/profile', checkToken, (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            authorizedData.user.password = null;
            res.status(200).send({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
    })
});

module.exports = router;
