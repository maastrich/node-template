const db = require('../../../database');
const utils = require('../../../utils');
const jwt = require('jsonwebtoken');

const bcrypt = require("bcryptjs");

async function updatePassword(req, res, next) {
    try {
        jwt.verify(req.token, process.env.TOKEN_SECRET, async (err, authorizedData) => {
            if (err) {
                throw new Error('Token not valid');
            } else {
                let user = await db.manageUser.getFrom.username(authorizedData.user.username);
                if (!user)
                    throw new Error('Unknown user');
                if (!bcrypt.compareSync(req.body.password, user.password))
                    throw new Error('Wrong Password');
                let updated = await db.manageUser.edit.password(user._id, req.body.newPassword);
                if (updated)
                    await res.status(200).send({ message: 'Successfuly Updated Password' });
                else
                    throw new Error('Internal Server Error');
            }
        })
    }
    catch (e) {
        console.error(e);
        utils.doesErrorNameIs('Token not valid', e)
            ? res.status(403).send({ error: 'Your token isn\'t valid, it may have expired' })
            : utils.doesErrorNameIs('Wrong Password', e)
                ? res.status(401).send({ error: 'Wrong Password' })
                : res.status(500).send({ error: 'Internal Server Error' });
    }
    finally {
        //next();
    }
}

module.exports = updatePassword;