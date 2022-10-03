const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const app = express();
const cors = require('cors');

const tourRoute = require('./routes/tour.route');

app.use(express.json());
app.use(cors());

// database connection using mongoose
mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connection successful');
});

app.get('/', (req, res) => {
  res.send('tour management api is working');
});

app.use('/api/v1/tour', tourRoute);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
