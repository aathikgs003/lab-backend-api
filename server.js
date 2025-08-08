const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('YOUR_ATLAS_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Atlast connected");
}).catch(err => {
  console.log('MongoDB connection error:', err);
});
const itemRoutes = require('.\routes/itemRoutes');
app.use('api/items', itemRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));