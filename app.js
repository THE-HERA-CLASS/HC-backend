const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.HOST_PORT;

const cookieParser = require('cookie-parser');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler.js');
var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server open on port ${port}`);
});
