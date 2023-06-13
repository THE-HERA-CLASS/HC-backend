// const https = require('https');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const swaggerFile = require('./swagger-output');

require('dotenv').config();
const port = process.env.HOST_PORT;

const cookieParser = require('cookie-parser');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler.js');
var cors = require('cors');

// 로컬과 프론트엔드도메인 둘다 허용함 왜냐면 프로트엔드가 로컬에서 테스트해야해서 해서
app.use(
  cors({
    origin: ['https://hera-class.com', 'http://localhost:3000'],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Server open on port ${port}`);
});

// https.createServer(app).listen(port, () => {
//   console.log(`Server open on port ${port}`);
// });
