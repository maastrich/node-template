const MongoClient = require('mongodb').MongoClient;
const dotenv = require( 'dotenv' );
dotenv.config();

async function identifier(id) {
    let user = null;
    try {
        const client = await new MongoClient(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const collection = await client.db(process.env.DB).collection("users");
        await collection.find().forEach( doc => {
            if (doc.id === id)
                user = doc;
        })
    }
    catch (e) {
        console.error(e);
    }
    return user;
}

module.exports = identifier;