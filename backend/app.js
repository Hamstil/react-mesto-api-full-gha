require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const { routes } = require('./routes');
const setErrors = require('./middlewares/setErrors');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(setErrors);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connect to db');
  await app.listen(PORT);
  console.log(`Server listen port ${PORT}`);
}

main();
