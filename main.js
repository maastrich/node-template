const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// set up port
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));
app.use(cors());

// Add Routes

const router = require('./src/router.js');
const admin = require('./src/admin.js')

// app.use('/assets', express.static('public')) if needed
app.use('/api', router);
// app.use('/admin', admin); To implement
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));