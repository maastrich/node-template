const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const bcrypt = require( 'bcryptjs' );
const dotenv = require( 'dotenv' );
dotenv.config();
async function password(id, newPassword) {
    try {
        const client = await new MongoClient(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const collection = client.db(process.env.DB).collection("users");
        await collection.updateOne(
            {"_id": mongodb.ObjectID(id)},
            {$set: {password: bcrypt.hashSync(newPassword, 8)}}
        );
        client.close();
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    return true;
}

module.exports = password;