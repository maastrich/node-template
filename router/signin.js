const db = require('../database');
const utils = require('../utils');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function signin(req, res, next) {
    try {
        // Get user data from db //
        let user = await db.manageUser.getFrom.mail(req.body.identifiant) ?
            await db.manageUser.getFrom.mail(req.body.identifiant) : await db.manageUser.getFrom.username(req.body.identifiant);
        if (!user)
            throw new Error('Unknown user');

        // Check if user validate his email
        if (!user.validateMail)
            throw new Error('Email not validate yet');

        // Check password Validity
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid)
            throw new Error('Wrong Password');
        
        // Generate a token //
        var token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            message: 'Successfuly Signed In',
            accessToken: token
        });
    }
    catch (e) {
        console.error(e);
        if (utils.doesErrorNameIs('Unknown user', e)) {
            res.status(404).send({
                error: 'Unknown User'
            });
        }
        else if (utils.doesErrorNameIs('Wrong Password', e)) {
            res.status(401).send({
                error: 'Wrong Password'
            });
        }
        else if (utils.doesErrorNameIs('Email not validate yet', e)) {
            res.status(403).send({
                error: 'You need to validate your email to login'
            });
        }
        else {
            res.status(500).send({
                error: e
            });
        }
    }
    finally {
        next();
    }
}

module.exports = signin;