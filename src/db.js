
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Maastrich:accessGSnA@bddgsna-yputt.mongodb.net/test?retryWrites=true&w=majority";
var uniqid = require('uniqid');
var mailSender = require('./mail-sender')


function register(req, res) {

    let send = {
        status: 500
    }
    try {
        let newDocument  = req.body;
        const client = await new MongoClient(uri, { useNewUrlParser: true }).connect();
        const collection = await client.db(process.env.DB).collection("pendingValidations");
        newDocument.id = await uniqid();
        const inserted = await collection.insertOne(newDocument);
        const mail = await mailSender.register(newDocument);
        status = 200;
    }
    catch (e) {
        console.log(e);
        send.status = 500;
    }
}



module.exports = {
    register,
}
