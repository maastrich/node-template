const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require( './database' );
const path  = require( 'path' );


db.manageUser.getFrom.username(null);
const app = express();

// For prod only
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "documentation/pug"));
app.get("/", (req, res) => {
  res.json({ message: "Wazaaaaa." });
});

app.use('/api', require( './router' ));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
