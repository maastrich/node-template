const MongoClient = require('mongodb').MongoClient;
const dotenv = require( 'dotenv' );
dotenv.config();

async function username(userName) {
    let user = null;
    try {
        const client = await new MongoClient(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const collection = client.db(process.env.DB).collection("users");
        await collection.find().forEach( doc => {
            if (doc.username === userName)
                user = doc;
        })
        client.close();
    }
    catch (e) {
        console.error(e);
    }
    return user;
}

module.exports = username;