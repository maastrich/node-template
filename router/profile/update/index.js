const password = require('./password');
const express = require( 'express' );

const update = express.Router();


update.post('/password', (req, res, next) => {
    const header = req.headers['authorization'];
    
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        
        req.token = token;
        password(req, res, next);
    } else {
        console.log('Forbidden')
        res.status(403).send('Not signed in or invalid connection');
        next();
    }
})

update.get('/test', (req, res, next) => {
    res.send({message: 'toto'});
})

module.exports = update