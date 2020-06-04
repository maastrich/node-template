const MongoClient = require('mongodb').MongoClient;
const dotenv = require( 'dotenv' );
const bcrypt = require("bcryptjs");
const userGetFrom = require( '../getFrom' )
const utils = require('../../../utils');
dotenv.config();

async function user(newUser) {
    let mailInUse, usernameInUse = false;
    try {
        mailInUse = await userGetFrom.mail(newUser.mail);
        usernameInUse = await userGetFrom.username(newUser.username);
        if (mailInUse || usernameInUse)
            throw new Error('User already exist');
        const client = await new MongoClient(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const collection = await client.db(process.env.DB).collection("users");
        newUser.password = bcrypt.hashSync(newUser.password, 8);
        newUser.validateMail = false;
        await collection.insertOne(newUser, (err) => {
            if (err)
                throw err;
        });
        return true;
    }
    catch (e) {
        if (utils.doesErrorNameIs('User already exist', e)) {
            if (mailInUse && usernameInUse)
                throw new Error('Both Username and Email are already registred');
            if (mailInUse)
                throw new Error('Email already registred');
            if (usernameInUse)
                throw new Error('Username already in use');
        }
        throw e;
    }
}

module.exports = user;