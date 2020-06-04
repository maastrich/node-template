const db = require( '../database' );

async function validateMail(req, res, next) {
    try {
        await db.manageUser.edit.mailValidation(req.params.id);
        res.status(200).send({message: 'OK'}); //.render('<script>window.close()</script>').send({message: 'OK'});
    } catch (e) {
        res.status(500).send({message: 'KO'}); // .render('<script>window.alert("An error occured");window.close()</script>').send({message: 'KO'});
    }
    finally {
        next();
    }
}

module.exports = validateMail