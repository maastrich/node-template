const db = require('../database');
const utils = require( '../utils' );
const mail = require( '../mail' );

async function signup(req, res, next) {
    try {
        await db.manageUser.add.user(req.body.user);
        const user = await db.manageUser.getFrom.mail(req.body.user.mail);
        mail.signup(user);
        res.status(200).send({
            message: 'Successfully Register'
        })
    }
    catch (e) {
        if (utils.doesErrorNameIs('Both Username and Email are already registred', e)) {
            res.status(409).send({
                alreadyInUse: 'both',
                error: 'Both Username and Email are already registred'
            })
        }
        else if (utils.doesErrorNameIs('Email already registred', e)) {
            res.status(409).send({
                alreadyInUse: 'mail',
                error: 'Email already registred'
            })
        }
        else if (utils.doesErrorNameIs('Username already in use', e)) {
            res.status(409).send({
                alreadyInUse: 'username',
                error: 'Username already in use'
            })
        }
        else {
            console.error(e);
            res.status(500).send({
                error: e.toString()
            });
        }
    }
    finally {
        next();
    }
}

module.exports = signup;