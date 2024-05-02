const express = require('express');
const bodyparser = require('body-parser');
const connectDatabase = require('./config/database');
const PORT = process.env.PORT || 34000;
const SERVER = process.env.SERVER || "http://localhost";
const errorMiddleware = require('./middlewares/errors');

const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

connectDatabase();

const auth = require('./routes/auth');
app.use('/api/v1',auth);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App is running at ${SERVER}:${PORT}`);
});