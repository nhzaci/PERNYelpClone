// npm module imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// local imports
const restaurantsRoute = require('./routes/v1/restaurants/restaurants');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/restaurants', restaurantsRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});
