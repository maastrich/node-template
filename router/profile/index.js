const jwt = require('jsonwebtoken');
const update = require('./update')

function getData(req, res, next) {
    //verify the JWT token generated for the user
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.status(403).send('Forbidden');
            next();
            return;
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.status(200).send({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
            next();
            return;
        }
    })
}

module.exports = {
    getData,
    update
}