const MongoClient = require('mongodb').MongoClient;
const dotenv = require( 'dotenv' );
dotenv.config();

async function mail(email) {
    let user = null;
    try {
        const client = await new MongoClient(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        const collection = await client.db(process.env.DB).collection("users");
        await collection.find().forEach( doc => {
            if (doc.mail === email)
                user = doc;
        })
        client.close();
    }
    catch (e) {
        console.error(e);
    }
    return user;
}

module.exports = mail;