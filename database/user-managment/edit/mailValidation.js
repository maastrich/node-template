const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dotenv = require( 'dotenv' );
dotenv.config();

async function mailValidation(id) {
    try {
        const client = await new MongoClient(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const collection = await client.db(process.env.DB).collection("users");
        await collection.updateOne(
            {"_id": mongodb.ObjectID(id)},
            {$set: {validateMail: true}}
        );
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    return true;
}

module.exports = mailValidation;